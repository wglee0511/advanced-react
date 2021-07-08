import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import Grid from "../elements/Grid";
import { actionGetPostForFirebase } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const user_info = useSelector((state) => state.user.user);

  const { list, is_loading, paging } = useSelector((state) => state.post);

  const distpatch = useDispatch();
  useEffect(() => {
    if (list.length === 0) {
      distpatch(actionGetPostForFirebase());
    }
  }, []);

  const nextCall = () => {
    distpatch(actionGetPostForFirebase(paging.next));
  };

  return (
    <>
      <InfinityScroll
        nextCall={nextCall}
        is_next={paging.next ? true : false}
        is_loading={is_loading}
      >
        {list.map((p, idx) => {
          if (p.user_info.user_id === user_info?.uid) {
            return (
              <Grid
                key={p.id}
                _onClick={() => props.history.push(`/post/${p.id}`)}
              >
                <Post key={p.id} {...p} is_me />;
              </Grid>
            );
          } else {
            return (
              <Grid
                key={p.id}
                _onClick={() => props.history.push(`/post/${p.id}`)}
              >
                <Post key={p.id} {...p} />;
              </Grid>
            );
          }
        })}
      </InfinityScroll>
    </>
  );
};

export default PostList;
