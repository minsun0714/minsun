export type Discussion = {
  answer: {
    author: string;
    avatarURL: string;
    bodyHTML: string;
    createdAt: string;
    id: number;
    url: string;
  } | null;
  author: string;
  avatarURL: string | null;
  bodyHTML: string | null;
  createdAt: string;
  id: number;
  url: string | null;
  title: string;
  updatedAt: string | null;
};

export type ItemsPerPage = 4 | 5;

export interface IPageBtns {
  totalPages: number;
  onPageChange: (buttonNumber: number) => void;
}

export type ToastAction = "ADD" | "DELETE" | "UPDATE";

export type ToastMsg =
  | "질문이 추가되었습니다."
  | "질문이 수정되었습니다."
  | "질문이 삭제되었습니다.";
