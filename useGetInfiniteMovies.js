import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";

function useGetInfiniteMovies(category) {
  const getData = async ({ pageParam }) => {
    const { data } = await axiosInstance.get(
      `/movie/${category}?language=ko-KR&page=${pageParam}`
    );
    return data;
  };

  return useInfiniteQuery({
    queryFn: getData,
    queryKey: ["movies", category],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMovie = lastPage.results.at(-1);
      return lastMovie ? allPages?.length + 1 : undefined;
      //lastMovie가 true라는 의미는 마지막 페이지에 영화 데이터가 하나 이상 있다는 뜻
      //lastMovie가 false라면, 즉 lastPage.results가 빈 배열이라면, 더 이상 불러올 데이터가 없다는 의미로 해석되어 undefined를 반환하고 불러오기를 멈춥니다.
    },
  });
}

export { useGetInfiniteMovies };
