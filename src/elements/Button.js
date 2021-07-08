import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Button = (props) => {
  const { type, text, _onClick } = props;

  if (type === "one") {
    return (
      <React.Fragment>
        <BtnOne onClick={_onClick}>
          <Text bold size="20px" color="white">
            {text}
          </Text>
        </BtnOne>
      </React.Fragment>
    );
  } else if (type === "full") {
    return (
      <React.Fragment>
        <BtnFull onClick={_onClick}>
          <Text bold size="20px" color="white">
            {text}
          </Text>
        </BtnFull>
      </React.Fragment>
    );
  } else if (type === "float") {
    return (
      <React.Fragment>
        <BtnFloat onClick={_onClick}>
          <Text bold size="20px" color="white">
            {text}
          </Text>
        </BtnFloat>
      </React.Fragment>
    );
  }
};

Button.defaultProps = {
  type: "one",
  text: "버튼",
  _onClick: () => console.log("Click"),
};

const BtnOne = styled.button`
  width: 50%;
  background-color: #cb0010;
  margin-right: 5px;
  height: 80px;
  border: none;
  border-radius: 15px;
  :hover {
    cursor: pointer;
  }
`;

const BtnFull = styled.button`
  width: 100%;
  background-color: #875643;
  margin-right: 5px;
  height: 80px;
  border: none;
  border-radius: 15px;
  :hover {
    cursor: pointer;
  }
`;

const BtnFloat = styled.button`
  width: 50px;
  height: 50px;
  background-color: black;
  color: ivory;
  padding: 16px;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  :hover {
    cursor: pointer;
  }
`;

export default Button;
