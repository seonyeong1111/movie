import Card from "../../components/card.jsx";
import CardSkeleton from "../../components/card-skeleton.jsx";
import useGetData from "../../hooks/useGetData.jsx";
import { useEffect } from "react";
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies.js";
import { useInView } from "react-intersection-observer";
import ClipLoader from "react-spinners/ClipLoader";

const Popular = () => {
  const {
    data: movies,
    isPending,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteMovies("popular");

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage, inView]);
  if (isLoading) {
    return (
      <div className="skeleton page-container">
        <CardSkeleton num={20} />;
      </div>
    );
  }
  if (isError) {
    return <h1 className="page-container">{error.message}</h1>;
  }
  return (
    <div className="movieRender page-container">
      {movies.pages?.map((movie) =>
        movie.results.map((movie) => <Card key={movie.id} movie={movie} />)
      )}
      {isFetching && <CardSkeleton num={20} />}
      <div ref={ref} className="scroll">
        {isFetching && <ClipLoader color={"#fff"}></ClipLoader>}
      </div>
    </div>
  );
};
export default Popular;
