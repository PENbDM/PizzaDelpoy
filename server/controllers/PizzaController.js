import Pizza from "../models/Pizza.js";
export const getAll = async (req, res) => {
  try {
    const pizza = await Pizza.find({}).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new Pizza({
      id: req.body.id,
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      types: req.body.types,
      sizes: req.body.sizes,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.category,
    });
    const pizza = await doc.save();
    //creating document(pizza)
    res.json(pizza);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not create pizza",
    });
  }
};
//sort by category
export const getPizzaMeat = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaVegan = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 2 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaGreel = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 3 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaSpicy = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 4 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaClosed = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 5 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
//sort by category

//sort by price,popular,alphabet
export const getSortRaiting = async (req, res) => {
  try {
    const pizza = await Pizza.find().sort({ rating: -1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getSortPrice = async (req, res) => {
  try {
    const pizza = await Pizza.find().sort({ price: -1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getSortTitle = async (req, res) => {
  try {
    const pizza = await Pizza.find().sort({ title: -1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
//sort by price,popular,alphabet
