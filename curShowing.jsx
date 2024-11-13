import Card from "../../components/card.jsx";
//import useGetData from "../../hooks/useGetData.jsx";
import CardSkeleton from "../../components/card-skeleton.jsx";
import { useEffect } from "react";
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies.js";
import { useInView } from "react-intersection-observer";
import ClipLoader from "react-spinners/ClipLoader";
//ref: 관찰할 요소에 설정하는 참조입니다. ref를 설정한 요소가 화면에 들어오면 inView 값이 true로 변경됩니다.
//inView: 요소가 화면에 보이면 true, 그렇지 않으면 false입니다.
//threshold: 요소가 보이는 것으로 간주되는 비율을 설정합니다. 예를 들어, 0.1로 설정하면 요소의 10%가 보일 때 inView가 true가 됩니다.
const CurShowing = () => {
  const {
    data: movies,
    isPending,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteMovies("now_playing");

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage, inView]);

  if (isPending) {
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

export default CurShowing;
