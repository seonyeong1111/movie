import Card from "../../components/card.jsx";
import CardSkeleton from "../../components/card-skeleton.jsx";
import { useState } from "react";
import { axiosInstance } from "../../apis/axios-instance.jsx";
import { useQuery } from "@tanstack/react-query";

const CurShowing = () => {
  const [page, setPage] = useState(1);

  const getData = async () => {
    return await axiosInstance.get(
      `/movie/now_playing?language=ko-KR&page=${page}`
    );
  };

  const {
    data = [],
    isPending,
    isError,
    error,
    isPreviousData,
  } = useQuery({
    queryKey: ["movies", page],
    queryFn: getData,
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
    keepPreviousData: true,
  });

  const hasMore = data.data?.page < data.data?.total_pages;
  console.log(data);

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
    <div className="page-container pagination-container">
      {isPending ? (
        <div className="skeleton">
          <CardSkeleton num={20} />;
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="movieRender">
          {data.data.results?.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <div className="pagination">
        <button
          className="button"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span className="currentPage">Current Page: {page}</span>
        <button
          className="button"
          onClick={() => {
            if (!isPreviousData && hasMore) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPreviousData || !hasMore}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CurShowing;
