import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import Grid from "../elements/Grid";

const Input = (props) => {
  const { type, label, placeholder, _onChange, multiLine, value } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }
  return (
    <Wrapper>
      <L>
        <Text size="20px">{label}</Text>
      </L>
      <I
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        required
      />
    </Wrapper>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: "라벨",
  value: null,
  type: "text",
  placeholder: "프홀",
  _onChange: () => console.log("change"),
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  margin: 10px 10px 30px 10px;
`;
const L = styled.label``;
const I = styled.input`
  height: 100%;
  width: 100%;
  margin: 10px 0 0 0;
  border: none;
  border-bottom: 2px solid black;
  font-size: 20px;
`;

export default Input;
