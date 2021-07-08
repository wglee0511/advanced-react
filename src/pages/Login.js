import React, { useState } from "react";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { actionLoginForFirebase } from "../redux/modules/user";
import emailchecker from "../shared/emailchecker";

const Login = (props) => {
  const [id, setId] = useState("");
  const [pwd, setpwd] = useState("");
  const dispatch = useDispatch();

  const handleOnChangeID = (event) => {
    const ID = event.target.value;
    setId(ID);
  };
  const handleOnChangePWD = (event) => {
    const PASSWORD = event.target.value;
    setpwd(PASSWORD);
  };

  const handleLogin = () => {
    if (!emailchecker(id)) {
      alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    dispatch(actionLoginForFirebase(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            type="text"
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={handleOnChangeID}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="password"
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            _onChange={handleOnChangePWD}
          />
        </Grid>

        <Button type="full" text="로그인하기" _onClick={handleLogin}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
