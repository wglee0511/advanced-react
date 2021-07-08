import React from "react";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { history } from "../redux/configureStore";

// <div>user pofile / user name / insert_dt</div>
const Post = (props) => {
  return (
    <Grid>
      <Grid is_flex>
        <Image src={props.user_info.user_profile} shape="circle" />
        <Text bold>{props.user_info.user_name}</Text>
        <Text>{props.insert_dt}</Text>
        {props.is_me && (
          <Button
            width="auto"
            margin="4px"
            padding="4px"
            _onClick={() => {
              history.push(`/write/${props.id}`);
            }}
          >
            수정
          </Button>
        )}
      </Grid>
      <Grid padding="16px">
        <Text>{props.contents}</Text>
      </Grid>
      <Grid>
        <Image src={props.image_url} shape="rectangle" />
      </Grid>
      <Grid padding="16px">
        <Text bold>댓글 {props.comments_cnt} 개</Text>
      </Grid>
    </Grid>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "모리야마 미쿠리",
    user_profile:
      "https://pbs.twimg.com/media/CvqCCUuUsAElojm?format=jpg&name=small",
  },
  image_url: "https://t1.daumcdn.net/cfile/tistory/990B51375D2DD14E16",
  contents: "미쿠리데스",
  comments_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
