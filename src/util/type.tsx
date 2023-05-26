export type ItemsPerPage = 4 | 5;

export interface IPageBtns {
  totalPages: number;
  onPageChange: (buttonNumber: number) => void;
}
