import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createDiscussion } from "../store/store";
import { Discussion } from "./type";

export const usePost = (url: string, HTTPRequestPayload: Discussion) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createData = async () => {
    try {
      setIsLoading(true);
      await axios.post(url, HTTPRequestPayload);
      dispatch(createDiscussion(HTTPRequestPayload));
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return createData;
};
