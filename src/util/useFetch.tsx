import { useState, useEffect } from "react";
import axios from "axios";
import { Discussion } from "../store/store";

type Fetch = [
  data: Discussion[],
  fetchData: (author?: string) => Promise<void>
];

export const useFetch = (url: string) => {
  // export const useFetch = (url: string): Fetch => {
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
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return data;
};
