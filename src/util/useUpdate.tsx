import { useState } from "react";
import axios from "axios";
import { Discussion, createDiscussion } from "../store/store";
import { useDispatch } from "react-redux";

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
      dispatch(createDiscussion(HTTPRequestPayload));
      window.location.reload();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return updateData;
};
