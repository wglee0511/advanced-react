import "./App.css";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import PostList from "../pages/PostList";
import Header from "./Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Button from "../elements/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLoginCheckForFirebase } from "../redux/modules/user";
import { apiKey } from "./firebase";
import Permit from "./Permit";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";

function App(props) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  useEffect(() => {
    if (is_session) {
      dispatch(actionLoginCheckForFirebase());
    }
  }, []);

  const handleWriteClick = () => {
    props.history.push("/write");
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/write" component={PostWrite} />
        <Route exact path="/write:id" component={PostWrite} />
        <Route exact path="/post/:id" component={PostDetail} />
        <Route exact path="/noti" component={Notification} />
        <Redirect from="*" to="/" />
      </Switch>
      <Permit>
        <Button type="float" _onClick={handleWriteClick} text="+"></Button>
      </Permit>
    </div>
  );
}

export default withRouter(App);
