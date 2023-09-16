import express from "express";
import mongoose from "mongoose";
import Pizza from "./models/Pizza.js";
import cors from "cors";
import * as PizzaController from "./controllers/PizzaController.js";
mongoose
  .connect(
    "mongodb+srv://dimapen2002:12Dimabob122@cluster0.rnqnljn.mongodb.net/React-Pizza"
  )
  // mongodb+srv://dimapen2002:12Dimabob122@cluster0.rnqnljn.mongodb.net/MERN-Blog
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => console.log("DB ERROR", err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/allpizza", PizzaController.getAll);
app.post("/createpizza", PizzaController.create);
//sort by category
app.get("/meatpizza", PizzaController.getPizzaMeat);
app.get("/veganpizza", PizzaController.getPizzaVegan);
app.get("/greelpizza", PizzaController.getPizzaGreel);
app.get("/spicypizza", PizzaController.getPizzaSpicy);
app.get("/closedpizza", PizzaController.getPizzaClosed);
//sort by categorys
//sort by price,popular,alphabet
app.get("/sortprice", PizzaController.getSortPrice);
app.get("/sortraiting", PizzaController.getSortRaiting);
app.get("/sorttitle", PizzaController.getSortTitle);
//sort by price,popular,alphabet
//sort by CATEGORY/SORT NEW
app.get("/categorysort", PizzaController.getCategorySort);
//sort by CATEGORY/SORT NEW

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
