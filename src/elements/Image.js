import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size } = props;
  const styles = {
    src,
    size,
  };

  return (
    <div>
      {shape === "circle" ? (
        <ImageCircle {...styles} />
      ) : (
        <AspectOutter>
          <AspectInner {...styles} />
        </AspectOutter>
      )}
    </div>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://news.nateimg.co.kr/orgImg/kz/2021/05/20/l_2021052002001003500181411.jpg",
  size: 36,
};

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;
