import React, { useState } from "react";
import Pagination from "../Paginations/Pagination";
import { Main, Board, Question, SubmitBtn } from "./DiscussionStyle";
import { DISCUSSIONS_URL } from "../../util/constant";
import { usePost } from "../../util/usePost";

function Discussions() {
  const [userName, setUserName] = useState("");
  const [discussionTitle, setDiscussionTitle] = useState("");

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.currentTarget.value);
  };

  const onChangeDiscussionTitle = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDiscussionTitle(event.currentTarget.value);
  };

  const newDiscussion = {
    answer: null,
    author: userName,
    avatarURL: null,
    bodyHTML: null,
    createdAt: JSON.stringify(new Date()),
    id: Date.now(),
    url: null,
    title: discussionTitle,
    updatedAt: null,
  };

  const createData = usePost(DISCUSSIONS_URL, newDiscussion);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName.length > 0 && discussionTitle.length > 0) {
      createData();
    }
    setUserName("");
    setDiscussionTitle("");
    window.location.reload();
  };

  return (
    <Main>
      <Board onSubmit={onSubmit}>
        <input
          placeholder='이름을 입력하세요'
          value={userName}
          onChange={onChangeUserName}
        ></input>
        <Question
          placeholder='질문을 입력하세요'
          value={discussionTitle}
          onChange={onChangeDiscussionTitle}
        ></Question>
        <SubmitBtn>등록</SubmitBtn>
      </Board>
      <Pagination />
    </Main>
  );
}
export default Discussions;
