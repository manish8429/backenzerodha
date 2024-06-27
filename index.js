require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const {OrdersModel}  = require('./model/OrdersModel')
const {HoldingsModel}  = require('./model/HoldingsModel')
const {PositionsModel}  = require('./model/PositionsModel')

const PORT = process.env.PORT || 3003;
const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => {
    console.log("Connected to database");
  })
  app.use(cors());
app.use(bodyParser.json());
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

// app.get("/addHolding", async(req, res) => {
//     let tempholdings =  await [
//   {
//     name: "INFY",
//     price: 1555.45,
//     percent: "-1.60%",
//     isDown: true,
//   },
//   {
//     name: "ONGC",
//     price: 116.8,
//     percent: "-0.09%",
//     isDown: true,
//   },
//   {
//     name: "TCS",
//     price: 3194.8,
//     percent: "-0.25%",
//     isDown: true,
//   },
//   {
//     name: "KPITTECH",
//     price: 266.45,
//     percent: "3.54%",
//     isDown: false,
//   },
//   {
//     name: "QUICKHEAL",
//     price: 308.55,
//     percent: "-0.15%",
//     isDown: true,
//   },
//   {
//     name: "WIPRO",
//     price: 577.75,
//     percent: "0.32%",
//     isDown: false,
//   },
//   {
//     name: "M&M",
//     price: 779.8,
//     percent: "-0.01%",
//     isDown: true,
//   },
//   {
//     name: "RELIANCE",
//     price: 2112.4,
//     percent: "1.44%",
//     isDown: false,
//   },
//   {
//     name: "HUL",
//     price: 512.4,
//     percent: "1.04%",
//     isDown: false,
//   },
// ];
//       tempholdings.forEach((items) => {
//         let newholding = new OrdersModel({
//           product: items.product,
//           name: items.name,
//           qty: items.qty,
//           avg: items.avg,
//           price: items.price,
//           net: items.net,
//           day: items.day,
//           isLoss: items.Boolean,
         
//         });

//         newholding.save();
//       })
// res.send("Holdings added successfully2")
// });

app.listen(PORT,() =>  {
    console.log("Server is running on port 3003");
   
});