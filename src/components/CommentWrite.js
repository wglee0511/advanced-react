import React, { useState } from "react";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Button from "../elements/Grid";
import { useDispatch } from "react-redux";
import { acionAddCommentFromDB } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const [comment, setComment] = useState("");
  const { post_id } = props;
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setComment(event.target.value);
  };
  const handleOnClick = () => {
    dispatch(acionAddCommentFromDB(post_id, comment));
    setComment("");
  };

  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={handleOnChange}
          value={comment}
        />
        <Button _onClick={handleOnClick} width="50px" margin="0px 2px 0px 2px">
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
