import React from "react";
import styles from "./Search.module.scss";
import search from "./search.svg";
import close from "./close.svg";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 700),
    []
  );

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={search} alt="" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizza..."
      />
      {value && (
        <img
          onClick={() => onClickClear()}
          className={styles.close}
          src={close}
          alt=""
        />
      )}
    </div>
  );
};
export default Search;
