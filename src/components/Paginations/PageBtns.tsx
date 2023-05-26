import React from "react";
import { PageBtnWrapper, PageBtn } from "./PaginationStyle";
import { ITEMS_PER_PAGE } from "../../util/constant";
import { IPageBtns } from "../../util/type";

function PageBtns({ totalPages, onPageChange }: IPageBtns) {
  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPages / ITEMS_PER_PAGE); i++) {
    pages.push(i);
  }

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(Number(event.currentTarget.textContent));
  };

  return (
    <PageBtnWrapper>
      {pages.map((page) => (
        <PageBtn key={page} onClick={onClick}>
          {page}
        </PageBtn>
      ))}
    </PageBtnWrapper>
  );
}

export default PageBtns;
