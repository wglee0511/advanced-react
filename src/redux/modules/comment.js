import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import firebase from "firebase/app";
import { firebaseStore } from "../../shared/firebase";
import { editPost } from "./post";

const initialComments = {
  list: {},
  is_loading: false,
};

const comment = createSlice({
  name: "comment",
  initialState: initialComments,
  reducers: {
    actionGetComment: (state, action) => {
      state.list[action.payload.post_id] = action.payload.commentArr;
    },
    actionAddComment: (state, action) => {
      state.list[action.payload.post_id].unshift(action.payload.comment);
    },
  },
});

export const acionGetCommentFromDB =
  (post_id = null) =>
  async (dispatch, getState, { history }) => {
    if (!post_id) {
      return;
    }

    try {
      const getComment = await firebaseStore
        .collection("comment")
        .where("post_id", "==", post_id)
        .orderBy("insert_dt", "desc")
        .get();
      let commentArr = [];
      getComment.forEach((doc) => {
        commentArr.push({ id: doc.id, ...doc.data() });
        console.log(doc.data());
      });
      dispatch(actionGetComment({ post_id, commentArr }));
    } catch (error) {
      console.error(error);
    }
  };

export const acionAddCommentFromDB =
  (post_id, contents) =>
  async (dispatch, getState, { history }) => {
    try {
      const user_info = getState().user.user;

      let comment = {
        post_id,
        contents,
        user_id: user_info.uid,
        user_name: user_info.user_name,
        user_profile: user_info.user_profile,
        insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      };
      await firebaseStore
        .collection("comment")
        .add(comment)
        .then((doc) => {
          comment = {
            ...comment,
            comment_id: doc.id,
          };
        });
      try {
        const increment = firebase.firestore.FieldValue.increment(1);
        const post = getState().post.list.find((each) => each.id === post_id);

        await firebaseStore
          .collection("post")
          .doc(post_id)
          .update({ comments_cnt: increment });
        dispatch(actionAddComment({ post_id, comment }));
        if (post) {
          dispatch(
            editPost({
              post_id,
              post: { comments_cnt: parseInt(post.comments_cnt) + 1 },
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

const { actionGetComment, actionAddComment } = comment.actions;

export default comment;
