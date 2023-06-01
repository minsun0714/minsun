import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscussion } from "../store/store";
import { Discussion } from "../util/type";

type Delete = (id: number) => Promise<void>;

export const useDelete = (url: string): Delete => {
  const dispatch = useDispatch();
  const state = useSelector((store: Discussion[]) => store);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  const deleteData = async (id: number) => {
    try {
      setIsLoading(true);
      await axios.delete(`${url}/${id}`);
      const targetItem: Discussion | undefined = state.find(
        (item: Discussion) => item.id === id
      );
      if (targetItem) dispatch(deleteDiscussion(targetItem));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    window.location.reload();
  };

  return deleteData;
};
