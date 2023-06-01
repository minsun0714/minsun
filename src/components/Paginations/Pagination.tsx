import React, { useState, useEffect } from "react";
import PageBtns from "./PageBtns";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDiscussion,
  updateDiscussion,
  Discussion,
} from "../../store/store";
import {
  Board,
  DiscussionsWrapper,
  Card,
  Content,
  Title,
  Author,
  UpdateInput,
  BtnWrapper,
  Btn,
} from "./PaginationStyle";
import Search from "./Search";
import { useFetch } from "../../util/useFetch";
import { useDelete } from "../../util/useDelete";
import { DISCUSSIONS_URL, ITEMS_PER_PAGE } from "../../util/constant";
import { useUpdate } from "../../util/useUpdate";

function Pagination() {
  const [currentItems, setCurrentItems] = useState<Discussion[]>([]);
  const data = useFetch(DISCUSSIONS_URL);

  useEffect(() => {
    setCurrentItems(data.slice(0, ITEMS_PER_PAGE));
  }, [data]);

  const handlePageChange = (page: number) => {
    const indexOfLastItem: number = page * ITEMS_PER_PAGE;
    const indexOfFirstItem: number = indexOfLastItem - ITEMS_PER_PAGE;
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
  };

  const [isUpdateBtnClicked, setIsUpdateBtnClicked] = useState(false);
  const [targetId, setTargetId] = useState(0);
  const [updatedContent, setUpdatedContent] = useState("");

  const onChangeUpdatedContent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdatedContent(event.currentTarget.value);
  };

  const updateData = useUpdate();

  const handleUpdate = (id: number, title: string) => {
    if (!isUpdateBtnClicked) {
      setIsUpdateBtnClicked(true);
      setTargetId(id);
      setUpdatedContent(title);
      return;
    }

    const discussionToUpdate: Discussion | undefined = data.find(
      (discussion: Discussion) => discussion.id === id
    );

    if (id !== targetId) {
      setIsUpdateBtnClicked(false);
      return;
    }

    if (discussionToUpdate) {
      const payload = { ...discussionToUpdate, title: updatedContent };
      updateData(DISCUSSIONS_URL, id, payload);
    }
    setIsUpdateBtnClicked(false);
  };

  const deleteData = useDelete(DISCUSSIONS_URL);

  const handleDelete = (id: number) => {
    if (isUpdateBtnClicked) {
      setIsUpdateBtnClicked(false);
      return;
    }
    deleteData(id);
  };

  return (
    <Board>
      <DiscussionsWrapper>
        <Search />
        <ul>
          {currentItems?.map((discussion) => (
            <Card key={discussion.id}>
              {isUpdateBtnClicked && discussion.id === targetId ? (
                <Content>
                  <UpdateInput
                    autoFocus
                    placeholder='수정할 내용을 입력해주세요'
                    value={updatedContent}
                    onChange={onChangeUpdatedContent}
                  ></UpdateInput>
                  <Author>{discussion.author}</Author>
                </Content>
              ) : (
                <Content>
                  <Title>
                    {discussion.title?.length > 40
                      ? discussion.title.slice(0, 40) + "..."
                      : discussion.title}
                  </Title>
                  <Author>{discussion.author}</Author>
                </Content>
              )}
              <BtnWrapper>
                <Btn
                  onClick={() => handleUpdate(discussion.id, discussion.title)}
                >
                  {isUpdateBtnClicked && discussion.id === targetId
                    ? "완료"
                    : "수정"}
                </Btn>
                <Btn onClick={() => handleDelete(discussion.id)}>
                  {isUpdateBtnClicked && discussion.id === targetId
                    ? "취소"
                    : "삭제"}
                </Btn>
              </BtnWrapper>
            </Card>
          ))}
        </ul>
        <PageBtns totalPages={data.length} onPageChange={handlePageChange} />
      </DiscussionsWrapper>
    </Board>
  );
}

export default Pagination;
