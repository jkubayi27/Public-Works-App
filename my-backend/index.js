const express = require("express");
const {Pool} = require("pg");
const cors = require("cors");
require("dotenv").config();
const jwt = require('jsonwebtoken');

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

// Using JWTs for stateless authentication (no server-side sessions)

// Login and issue JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2',[username,password]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const payload = { username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'TOPSECRETJWT', { expiresIn: '1h' });
            return res.json({ user, token, valid: true });
        }
        return res.status(401).json({ error: 'Invalid credentials' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Authentication failed' });
    }
});

// Logout (client should discard JWT) — stateless on server
app.get('/logout', (req, res) => {
    res.json({ message: 'Logged out (discard token on client)' });
});

// JWT middleware to protect routes
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET || 'TOPSECRETJWT', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

//Example route (protected)
app.get("/orders", authenticateToken, async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM orders ORDER BY date DESC');
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

//Add new orders (protected)
app.post('/add-order', authenticateToken, async (req,res) => {
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

//Filter orders to see completed (protected)
app.get("/completed-orders", authenticateToken, async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE completed = $1',[true]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error : "Filtering completed query failed"});
    }
});

//Filter order by trade (protected)
app.get("/filter-orders", authenticateToken, async (req,res) => {
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

//Retrieve order datils via id (protected)
app.get("/orders/:id", authenticateToken, async (req,res) => {
    const orderID = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM orders WHERE ordernum = $1",[orderID]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        console.log("Failed to fetch order info");
    }
})

//Patch request to a works order (protected)
app.put("/orders/:id", authenticateToken, async (req,res) => {
    const orderID = req.params.id;
    const {completed,date,orderdesc,remark,trade,wardnum} = req.body;
    try {
        const result = await pool.query(
            "UPDATE orders SET completed = $1,date = $2,orderdesc = $3,remark = $4,trade = $5,wardnum = $6 WHERE ordernum = $7",
            [completed,date,orderdesc,remark,trade,wardnum,orderID]);
        //Add a query to save material used
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        console.log("Failed to update order");
    }
})

//Get or generate report info (protected)
app.get("/report", authenticateToken, async (req,res) => {
    const tradeType = req.params.tradeType;
    try {
        const result = await pool.query(
            `SELECT trade,
            SUM(CASE WHEN completed = TRUE THEN 1 ELSE 0 END) AS complete,
            SUM(CASE WHEN completed = FALSE THEN 1 ELSE 0 END) AS incomplete
            FROM orders
            GROUP BY trade;
            `
        );
        res.json(result.rows);
    } catch(err) {
        console.log(err);
        console.log("Failed to get trade occurences");
    }
});

// Removed passport local strategy and session-based auth in favor of JWT

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));