import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
const Home = () => {
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.category);
  const sortType = useSelector((state) => state.filter.sortBy);
  const currentPage = useSelector((state) => state.filter.page);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:4444/categorysort", {
        params: {
          category: categoryId,
          sortBy: sortType,
          page: currentPage,
        },
      })
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, sortType]);
  // categoryId here, so,useEffect, have to follow
  // for this state,if this state will chanched, then we fire request(useEffect).
  // console.log(categoryId, sortType);
  // items.map((obj, index) => <PizzaBlock key={index} {...obj} />

  React.useEffect(() => {
    const queryString = qs.stringify({
      categoryId,
      sortType,
      currentPage,
    });

    navigate(`?${queryString}`);
    console.log(queryString);
  }, [categoryId, currentPage, sortType]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj, index) => <PizzaBlock key={index} {...obj} />);
  const skeletons = [...new Array(10)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort
          sortValue={sortType}
          onClickSort={(id) => dispatch(setSortType(id))}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
};
export default Home;
