import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { acionGetCommentFromDB } from "../redux/modules/comment";

const CommentList = (props) => {
  const { post_id } = props;
  const commentArr = useSelector((state) => state.comment.list);
  const dispatch = useDispatch();

  const comment_list = commentArr[post_id];
  useEffect(() => {
    if (!commentArr[post_id]) {
      dispatch(acionGetCommentFromDB(post_id));
    }
  }, []);
  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list?.map((each) => {
          return <CommentItem key={each.comment_id} {...each} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;

  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" />
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  contents: "귀여운 고양이네요!",
  insert_dt: "2021-01-01 19:00:00",
};
