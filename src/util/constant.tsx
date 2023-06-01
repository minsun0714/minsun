import { ItemsPerPage, ToastAction, ToastMsg } from "./type";

export const DISCUSSIONS_URL = "http://localhost:3001/discussions";

export const ITEMS_PER_PAGE: ItemsPerPage = 4;

export const ADD: ToastAction = "ADD";
export const UPDATE: ToastAction = "UPDATE";
export const DELETE: ToastAction = "DELETE";

export const ADD_MESSAGE: ToastMsg = "질문이 추가되었습니다.";
export const UPDATE_MESSAGE: ToastMsg = "질문이 수정되었습니다.";
export const DELETE_MESSAGE: ToastMsg = "질문이 삭제되었습니다.";
