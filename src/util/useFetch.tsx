import { useState, useEffect } from "react";
import axios from "axios";
import { Discussion, createDiscussion } from "../store/store";
import { useDispatch } from "react-redux";

export const useFetch = (url: string): Discussion[] => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      dispatch(createDiscussion(response.data));
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
