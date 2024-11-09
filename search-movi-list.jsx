import { useSearchParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import Card from "../components/card";
import CardSkeleton from "./card-skeleton";

const SearchMovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ mq: "" });
  const mq = searchParams.get("mq");

  const {
    data: movies,
    isLoading,
    isError,
  } = useGetData(`/search/movie?query=${mq}&language=ko-KR&page=1`);

  if (isLoading) {
    return (
      <div className="skeleton">
        <CardSkeleton num={20} />;
      </div>
    );
  }

  if (isError) {
    return <h1 classNmae="page-container">에러</h1>;
  }

  if (mq && movies.data?.results.length === 0) {
    return (
      <h1 className="noData">
        해당하는 '{mq}'검색어에 해당하는 데이터가 없습니다
      </h1>
    );
  }

  return (
    <div className="movieRender">
      {movies.data?.results.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default SearchMovieList;
