import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchMovieList from "../components/search-movi-list";

function Search() {
  const [searchVal, setSearchVal] = useState("");

  const onChangeSearchVal = (e) => {
    setSearchVal(e.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams({ mq: "" });
  const mq = searchParams.get("mq");

  const navigate = useNavigate();

  const handleSearchMovie = () => {
    if (mq === searchVal) {
      return;
    }
    navigate(`/search?mq=${searchVal}`);
  };

  const handleSearchMovieKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  return (
    <div className="page-container searchRender">
      <div className="search">
        <input
          className="searchInput"
          type="text"
          placeholder="영화 제목을 입력해주세요"
          onChange={onChangeSearchVal}
          value={searchVal}
          onKeyDown={handleSearchMovieKeyboard}
        ></input>
        <button
          className=" button searchButton"
          type="submit"
          onClick={handleSearchMovie}
        >
          검색
        </button>
      </div>
      <SearchMovieList></SearchMovieList>
    </div>
  );
}
export default Search;
