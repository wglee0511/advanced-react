import { createSlice } from "@reduxjs/toolkit";
import { firebaseStorage } from "../../shared/firebase";

const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

const image = createSlice({
  name: "image",
  initialState,
  reducers: {
    actionUploading: (state, action) => {
      state.uploading = action.payload;
    },
    actionUpload: (state, action) => {
      state.image_url = action.payload;
      state.uploading = false;
    },
    actionPreview: (state, action) => {
      state.preview = action.payload;
    },
  },
});

export const actionUploadForStorage =
  (image) =>
  async (dispatch, getState, { history }) => {
    dispatch(actionUploading(true));
    try {
      const uploadfile = await firebaseStorage
        .ref(`images/${image.name}`)
        .put(image);
      try {
        const url = await uploadfile.ref.getDownloadURL();
        dispatch(actionUpload(url));
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const { actionUploading, actionUpload, actionPreview } = image.actions;

export default image;
