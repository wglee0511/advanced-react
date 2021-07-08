import { createSlice } from "@reduxjs/toolkit";
import { firebaseStorage, firebaseStore } from "../../shared/firebase";
import moment from "moment";
import { actionPreview } from "./image";

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  /*   id: 0,
  user_info: {
    user_name: "모리야마 미쿠리",
    user_profile:
      "https://pbs.twimg.com/media/CvqCCUuUsAElojm?format=jpg&name=small",
  }, */
  image_url: "https://t1.daumcdn.net/cfile/tistory/990B51375D2DD14E16",
  contents: "",
  comments_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const post = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    actionSetPost: (state, action) => {
      state.list.push(...action.payload.arrForUpload);
      state.paging = action.payload.paging;
      state.is_loading = false;
    },
    actionAddPost: (state, action) => {
      state.list.unshift(action.payload);
    },
    actionIsLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    editPost: (state, action) => {
      let index = state.list.findIndex(
        (each) => each.id === action.payload.post_id
      );
      state.list[index] = { ...state.list[index], ...action.payload.post };
    },
  },
});

//action db

export const actionGetPostForFirebase =
  (start = null, size = 3) =>
  async (dispatch, getState, { history }) => {
    try {
      let _paging = getState().post.paging;
      if (_paging.start && _paging.next === null) {
        return;
      }

      dispatch(actionIsLoading(true));
      const getPost = firebaseStore.collection("post");

      let query = getPost.orderBy("insert_dt", "desc");

      if (start) {
        query = query.startAt(start);
      }

      const getDocs = await query.limit(size + 1).get();

      let paging = {
        start: getDocs.docs[0],
        next:
          getDocs.docs.length === size + 1
            ? getDocs.docs[getDocs.docs.length - 1]
            : null,
        size,
      };
      let arrForUpload = [];
      getDocs.forEach((each) => {
        let before = {
          id: each.id,
          ...each.data(),
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
        arrForUpload.push(after);
      });
      if (getDocs.docs.length > size) {
        arrForUpload.pop();
      }
      dispatch(actionSetPost({ arrForUpload, paging }));
    } catch (error) {
      console.error(error);
    }
  };

export const actionUploadForFirebase =
  (contents = "") =>
  async (dispatch, getState, { history }) => {
    try {
      const prepare = firebaseStore.collection("post");
      const getUser = getState().user.user;
      const preview = getState().image.preview;

      try {
        const upLoadToStore = await firebaseStorage
          .ref(`images/${getUser.uid}_${new Date().getTime()}`)
          .putString(preview, "data_url");
        try {
          const getUrl = await upLoadToStore.ref.getDownloadURL();
          try {
            const user_info = {
              user_name: getUser.user_name,
              user_id: getUser.uid,
              user_profile: getUser.user_profile,
            };
            const initObj = {
              ...initialPost,
              image_url: getUrl,
              contents: contents,
              insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
            };
            const uploadToDb = await prepare.add({ ...user_info, ...initObj });

            const toPost = {
              user_info,
              ...initObj,
              id: uploadToDb.id,
            };
            dispatch(actionAddPost(toPost));
            history.replace("/");
            dispatch(actionPreview(null));
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = firebaseStore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost({ post_id, post: { ...post } }));
          history.replace("/");
        });

      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = firebaseStorage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};

export const { actionSetPost, actionAddPost, actionIsLoading, editPost } =
  post.actions;

export default post;
