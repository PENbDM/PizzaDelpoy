type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
  //description for function. typing here
};
const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  // console.log(value);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <>
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
            >
              {categoryName}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
