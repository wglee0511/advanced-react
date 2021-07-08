import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, padding, margin, bg, children, center, _onClick } =
    props;
  const styles = {
    is_flex,
    width,
    padding,
    margin,
    bg,
    center,
  };

  return (
    <GridBox {...styles} onClick={_onClick}>
      {children}
    </GridBox>
  );
};

Grid.defaultProps = {
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  children: null,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding : ${props.padding};` : "")}
  ${(props) => (props.margin ? ` margin : ${props.margin};` : "")}
    ${(props) => (props.bg ? ` background-color : ${props.bg};` : "")}
    ${(props) =>
    props.is_flex
      ? `display : flex ; align-items : center ; justify-content: space-between ; `
      : ""}
    
    ${(props) => (props.center ? `text-align: center` : "")}
`;

export default Grid;
