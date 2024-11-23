import React from "react";
import { axiosInstance } from "../apis/axios-instance";
import { useState, useEffect } from "react";
import Card from "../components/card";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { SiWebtoon } from "react-icons/si";
import { FiGift } from "react-icons/fi";
function HeartMovies() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    // 1. 로컬스토리지에서 좋아요된 영화 ID 배열 가져오기
    const movieId = localStorage.getItem("likedMoviesId");

    if (movieId) {
      const likedMovieIds = JSON.parse(movieId); // 문자열을 배열로 변환

      // 2. 좋아요된 영화 ID 배열이 있을 때 API 호출
      const fetchMoviesData = async () => {
        if (likedMovieIds.length === 0) return;
        // 좋아요된 영화가 없으면 API 호출하지 않음

        // 여러 개의 영화 ID에 대해 API 호출을 병렬로 처리
        likedMovieIds;
        const movieDataPromises = likedMovieIds.map((id) =>
          axiosInstance.get(`/movie/${id}?language=ko-KR&page=1`)
        );

        // 모든 API 요청의 응답을 기다림
        const movieDataResponses = await Promise.all(movieDataPromises);

        // API 응답에서 데이터를 추출
        const movies = movieDataResponses.map((response) => response.data);
        setMoviesData(movies);
      };

      fetchMoviesData(); // 영화 데이터 가져오기 함수 실행
    }
  }, []);

  return (
    <div className="page-container column">
      <h2 className="my">보관함</h2>
      <div className="flexible">
        <MdOutlineSubscriptions color="white" />
        <h3 className="my">구독</h3>
      </div>
      <div className="flexible">
        <BiPurchaseTagAlt color="white" />
        <h3 className="my">개별 구매</h3>
      </div>
      <div className="flexible">
        <SiWebtoon color="white" />
        <h3 className="my">웹툰</h3>
      </div>
      <div className="flexible">
        <FiGift color="white"></FiGift>
        <h3 className="my">선물함</h3>
      </div>

      <div className="my">
        <h3>최근 보고싶어요한 콘텐츠</h3>
        <div className="movieRender">
          {moviesData?.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default HeartMovies;
