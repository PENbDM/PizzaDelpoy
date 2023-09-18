import Pizza from "../models/Pizza.js";
import Cart from "../models/Cart.js";

export const addCart = async (req, res) => {
  try {
    const pizzas = req.body; // Массив объектов пицц
    // Проверка наличия массива пицц в запросе
    if (!pizzas || !Array.isArray(pizzas)) {
      return res.status(400).json({
        message: "Invalid request data",
      });
    }

    const cartItems = [];

    for (const pizzaData of pizzas) {
      const pizzaId = pizzaData.id;
      const size = pizzaData.size;
      const types = pizzaData.types;
      const quantity = pizzaData.quantity;
      // Найдите пиццу в базе данных по идентификатору
      const pizza = await Pizza.findOne({ id: pizzaId });
      if (!pizza) {
        return res.status(404).json({
          message: `Pizza with id ${pizzaId} not found`,
        });
      }

      // Создайте объект пиццы для добавления в корзину
      const pizzaItem = {
        pizza: pizza._id, // Ссылка на пиццу
        title: pizza.title,
        types: types,
        imageUrl: pizza.imageUrl,
        size: size,
        price: pizza.price,
        quantity: quantity,
      };

      cartItems.push(pizzaItem);
    }

    // Создайте запись корзины с массивом объектов пицц
    const cart = new Cart({
      order: cartItems,
    });

    // Сохраните запись корзины
    const savedCart = await cart.save();

    res.json(savedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Could not add pizza(s) to cart",
    });
  }
};
