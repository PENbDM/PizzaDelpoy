import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);
  console.log(sortType);
  const requestArrTypePizza = [
    "/allpizza",
    "/meatpizza",
    "/veganpizza",
    "/greelpizza",
    "/spicypizza",
    "/closedpizza",
  ];
  const requestSort = ["/rating", "/price", "/title"];
  React.useEffect(() => {
    setIsLoading(true);
    const apiUrl = `${requestArrTypePizza[categoryId]}?sortBy=${requestSort[sortType]}&order=desc`;
    fetch(apiUrl)
      // fetch(requestArrTypePizza[categoryId])
      // fetch(
      //   `?${
      //     categoryId > 0 ? `category=${requestArrTypePizza[categoryId]}` : ""
      //   }&sortBy=${requestSort[sortType]} &order=desc`
      // )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
    //when home first time render, then make fast scroll in top
  }, [categoryId, sortType]);
  // categoryId here, so,useEffect, have to follow
  // for this state,if this state will chanched, then we fire request(useEffect).
  // console.log(categoryId, sortType);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort sortValue={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((obj, index) => <PizzaBlock key={index} {...obj} />)}
      </div>
    </div>
  );
};
export default Home;
