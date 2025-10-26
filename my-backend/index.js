const express = require("express");
const {Pool} = require("pg");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const session = require("express-session");
const Strategy = require("passport-local");

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

//Create session
app.use(session({
    secret : "JulioSecret",
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        secure : false
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//Login using session
app.get('/authenticate', async (req,res) => {
    const {username,password} = req.query;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
        const user = result.rows[0];
        console.log(user);
        if (!user) {
            console.log('User not found')
        } else if (user.password == password) {
            //Store user credentials in session
            req.session.user = {id : user.id, username : user.username};
            res.json(true);
        } else {
            res.json(false);
            console.log('Invalid credentials');
        }
    } catch(err) {
        console.log(err);
    }
})

//Logout of session
app.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({error: err.message});
        res.clearCookie("connect.sid");
        res.json({message : "Logged out successfully"});
    });
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
    console.log(req.body);
    const {completed,date,orderdesc,remark,trade,wardnum} = req.body;
    try {
        const result = await pool.query(
            "UPDATE orders SET completed = $1,date = $2,orderdesc = $3,remark = $4,trade = $5,wardnum = $6 WHERE ordernum = $7",
            [completed,date,orderdesc,remark,trade,wardnum,orderID]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        console.log("Failed to update order");
    }
})

//Get or generate report info
app.get("/report",async (req,res) => {
    const tradeType = req.params.tradeType;
    try {
        const result = await pool.query(
            "SELECT trade,COUNT (*) as occurence FROM orders GROUP BY trade"
        );
        res.json(result.rows);
    } catch(err) {
        console.log(err);
        console.log("Failed to get trade occurences");
    }
});

//Authentication strategy
passport.use(new Strategy (async function verify(username,password, cb) {
    console.log(username);
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2',[username,password]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const correctPassword = user.password;
            if (correctPassword == password){
                console.log('Login successful');
                return cb(null,user)
            } else {
                console.log('Incorrect password or username');
                return cb(null,false);
            }
        }  else {
            return cb('User not found');
        }
    } catch(err) {
        return cb(err);
    }
}));

//serialize & deserialize passport
passport.serializeUser((user,cb) => {
    cb(null,user);
});

passport.deserializeUser((user,cb) => {
    cb(null,user);
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));