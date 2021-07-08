import React from "react";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import Text from "../elements/Text";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionLogoutForFirebase } from "../redux/modules/user";
import { apiKey } from "./firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  const handleOnLogin = () => {
    props.history.push("/login");
  };
  const handleOnSignup = () => {
    props.history.push("/signup");
  };
  const handleOnLogout = () => {
    dispatch(actionLogoutForFirebase({}));
  };

  return (
    <React.Fragment>
      {is_login && is_session ? (
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              헬로
            </Text>
          </Grid>

          <Grid is_flex>
            <Button _onClick={handleOnLogin} text="내정보" type="one"></Button>
            <Button text="알림" type="one"></Button>
            <Button
              _onClick={handleOnLogout}
              text="로그아웃"
              type="one"
            ></Button>
          </Grid>
        </Grid>
      ) : (
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              헬로
            </Text>
          </Grid>

          <Grid is_flex>
            <Button _onClick={handleOnLogin} text="로그인" type="one"></Button>
            <Button
              _onClick={handleOnSignup}
              text="회원가입"
              type="one"
            ></Button>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default withRouter(Header);
