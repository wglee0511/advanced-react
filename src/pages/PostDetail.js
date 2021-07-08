import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommetList";
import Post from "../components/Post";
import { firebaseStore } from "../shared/firebase";

const PostDetail = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login);
  const post_id = useParams().id;
  const post_index = post_list.findIndex((each) => each.id === post_id);
  const post_data = post_list[post_index];
  const [post, setPost] = useState(post_data ? post_data : null);
  useEffect(() => {
    if (post) {
      return;
    }
    (async () => {
      try {
        const getDoc = await firebaseStore
          .collection("post")
          .doc(post_id)
          .get();
        let before = {
          id: getDoc.id,
          ...getDoc.data(),
        };
        let after = {
          id: before.id,
          user_info: {
            user_name: before.user_name,
            user_profile: before.user_profile,
            user_id: before.user_id,
          },
          image_url: before.image_url,
          contents: before.contents,
          comments_cnt: before.comments_cnt,
          insert_dt: before.insert_dt,
        };

        setPost(after);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <Post {...post} is_me={post?.user_info.user_id === user_info?.uid} />
      {is_login && <CommentWrite post_id={post_id} />}
      <CommentList post_id={post_id} />
    </React.Fragment>
  );
};

export default PostDetail;
