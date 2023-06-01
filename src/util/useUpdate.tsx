import { useState } from "react";
import axios from "axios";
import { createDiscussion, updateDiscussion } from "../store/store";
import { useDispatch } from "react-redux";
import { Discussion } from "./type";

export const useUpdate = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateData = async (
    url: string,
    id: number,
    HTTPRequestPayload: Discussion
  ): Promise<void> => {
    try {
      setIsLoading(true);
      await axios.patch(`${url}/${id}`, HTTPRequestPayload);
      dispatch(updateDiscussion(HTTPRequestPayload));
      window.location.reload();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return updateData;
};
