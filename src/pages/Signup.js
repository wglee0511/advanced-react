import React, { useState } from "react";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { actionSignupForFirebase } from "../redux/modules/user";
import emailchecker from "../shared/emailchecker";

const Signup = (props) => {
  const [id, setId] = useState("");
  const [user_name, setUsername] = useState("");
  const [pwd, setpwd] = useState("");
  const [pwd_2, setpwd_2] = useState("");
  const dispatch = useDispatch();
  const handleSignup = () => {
    if (id === "" || user_name === "" || pwd === "") {
      return;
    }
    if (!emailchecker(id)) {
      alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    if (pwd.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }
    if (pwd !== pwd_2) {
      alert("비밀번호를 다시 확인해주세요");
      return;
    }
    dispatch(actionSignupForFirebase(id, pwd, user_name));
    console.log("click");
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            type="email"
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={(e) => {
              setpwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={(e) => {
              setpwd_2(e.target.value);
            }}
          />
        </Grid>

        <Button
          type="full"
          text="회원가입하기"
          _onClick={handleSignup}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
