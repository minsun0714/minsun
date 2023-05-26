import { useState, useEffect } from "react";
import axios from "axios";
import { Discussion } from "../store/store";

export const useCRUD = (url: string) => {
  const [data, setData] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (author?: string) => {
    const queryParameter = author ? author : "";
    console.log("쿼리파라미터", author);
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    try {
      setIsLoading(true);
      await axios.delete(`${url}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return [data, fetchData, deleteData];
};
