import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (params) => {
    const { items, totalPrice, user } = params;
    const { data } = await axios.post("http://localhost:4444/order", {
      pizzas: items,
      totalPrice: totalPrice,
      user: user,
    });
    return data;
  }
);

export const fetchOrderToUser = createAsyncThunk(
  "order/fetchOrderToUser",
  async (params) => {
    const { data } = await axios.get(
      `http://localhost:4444/getorder?_id=${params}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};
