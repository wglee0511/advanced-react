import React, { useEffect, useState } from "react";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import Text from "../elements/Text";
import Upload from "../shared/Upload";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { useDispatch, useSelector } from "react-redux";
import { actionUploadForFirebase } from "../redux/modules/post";
import { actionPreview } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [text, setText] = useState(_post ? _post.contents : "");

  useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();
      return;
    }

    if (is_edit) {
      dispatch(actionPreview(_post.image_url));
    }
  }, []);

  const handleOnClick = () => {
    props.history.replace("/login");
  };

  const handleOnChange = (event) => {
    const contentsInput = event.target.value;
    setText(contentsInput);
  };

  const handleUpload = () => {
    dispatch(actionUploadForFirebase(text));
  };

  const handleEdit = () => {};

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="17px">로그인 후 글을 올릴 수 있습니다.</Text>
        <Button type="full" _onClick={handleOnClick}>
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          게시글 작성
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>
        {preview && <Image shape="rectangle" src={preview} />}
      </Grid>

      <Grid padding="16px">
        <Input
          _onChange={handleOnChange}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={handleEdit}></Button>
        ) : (
          <Button text="게시글 작성" _onClick={handleUpload}></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
