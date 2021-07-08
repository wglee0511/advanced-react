import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import comment from "./modules/comment";
import image from "./modules/image";
import post from "./modules/post";
import user from "./modules/user";

export const history = createBrowserHistory();

const middlewares = [
  thunk.withExtraArgument({
    history,
  }),
];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  user: user.reducer,
  post: post.reducer,
  image: image.reducer,
  comment: comment.reducer,
  router: connectRouter(history),
});

let store = configureStore({ reducer, middleware: middlewares });

export default store;
