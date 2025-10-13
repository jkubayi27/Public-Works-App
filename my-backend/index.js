const express = require("express");
const {Pool} = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//Postgres connection pool
const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASS,
    port : process.env.DB_PORT,
});

//Example route
app.get("/orders", async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

//Add new orders
app.post('/add-order', async (req,res) => {
    const {ordernum, wardnum, orderdesc, date, trade} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO orders (ordernum,wardnum, orderdesc,date,trade) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [ordernum,wardnum,orderdesc,date,trade]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error : "Database error"});
    }
});

//Filter orders to see completed
app.get("/completed-orders", async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE completed = $1',[true]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error : "Filtering completed query failed"});
    }
});

//Filter order by trade
app.get("/filter-orders", async (req,res) => {
    const {trade,orderType} = req.query;
    let completionStatus = orderType == 'Completed' ? true : false;
    try {
        const result = await pool.query(
            'SELECT * FROM orders where completed = $1 AND trade = $2',[completionStatus,trade]
        );
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error : "Filtering query failed"});
    }
})

//Retrieve order datils via id
app.get("/orders/:id", async (req,res) => {
    const orderID = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM orders WHERE ordernum = $1",[orderID]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        console.log("Failed to fetch order info");
    }
})

//Patch request to a works order
app.put("/orders/:id", async (req,res) => {
    const orderID = req.params.id;
    const {completed,date,orderdesc,ordernum,remark,trade,wardnum} = req.query;
    try {
        const result = await pool.query(
            "UPDATE orders SET completed = $1,date = $2,orderdesc = $3,ordernum = $4,remark = $5,trade = $6,wardnum = $7 WHERE ordernum = $8",
            [completed,date,orderdesc,ordernum,remark,trade,wardnum,orderID]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        console.log("Failed to update order");
    }
})

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));