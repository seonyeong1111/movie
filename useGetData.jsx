import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance.jsx";
import { useQuery } from "@tanstack/react-query";

const useGetData = (url) => {
  const getData = async () => {
    return await axiosInstance.get(url);
  };
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [url],
    queryFn: getData,
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });
  return { data, isLoading, isError };
};
export default useGetData;

/*const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(url);

        setData(response);
      } catch (error) {
        setisError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useGetData;*/
