import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionPreview } from "../redux/modules/image";

const Upload = (props) => {
  const file = useRef();
  const isUploading = useSelector((state) => state.image.uploading);
  const dispatch = useDispatch();

  const handleSelect = () => {
    const fileForReader = file.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileForReader);
    reader.onloadend = (event) => {
      const result = event.target.result;
      dispatch(actionPreview(result));
    };
  };

  return (
    <React.Fragment>
      <input
        type="file"
        onChange={handleSelect}
        ref={file}
        disabled={isUploading}
      />
    </React.Fragment>
  );
};

export default Upload;
