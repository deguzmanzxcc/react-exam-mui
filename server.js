require('dotenv').config({path: './.env'});
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001

const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB).catch(err => console.log(err));


//DB SCHEMA AND MODEL

const invoiceSchema = mongoose.Schema({
    num: Number,
    clientName: String,
    customerName: String,
    date: Date,
    item: String,
    itemQty: Number,
    itemPrice: Number,
    total: Number,
})

const Invoice = mongoose.model("Invoice", invoiceSchema);
//
app.get("/", (req, res) =>{
    res.send("Welcome to Express!");
});

//create
app.post("/create", (req, res) =>{
    Invoice.create({
        clientName: req.body.clientName,
        customerName: req.body.customerName,
        date: req.body.date,
        item: req.body.item,
        itemQty: req.body.itemQty,
        itemPrice: req.body.itemPrice,
        total: req.body.total,
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

app.get("/invoices", (req, res) => {
    Invoice.find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res)=> {
    Invoice.findByIdAndDelete({_id: req.params.id})
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

app.put("/updated/:id", (req, res) => {
    Invoice.findByIdAndUpdate(
        { _id: req.params.id },
        {
            clientName: req.body.clientName,
            customerName: req.body.customerName,
            date: req.body.date,
            item: req.body.item,
            itemQty: req.body.itemQty,
            itemPrice: req.body.itemPrice,
            total: req.body.total,
        }
    )
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
})

app.listen(process.env.PORT || 3001, function(){
    console.log(`Server is running on ${port}`);
    console.log(`Connected to ${mongoDB}`)
});