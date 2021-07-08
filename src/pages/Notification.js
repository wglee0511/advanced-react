import React from "react";
import Card from "../components/Card";
import Grid from "../elements/Grid";

const Notification = (props) => {
  let noti = [
    { user_name: "aaaaa", post_id: "post1", image_url: "" },
    { user_name: "aaaaa", post_id: "post2", image_url: "" },
    { user_name: "aaaaa", post_id: "post3", image_url: "" },
    { user_name: "aaaaa", post_id: "post4", image_url: "" },
    { user_name: "aaaaa", post_id: "post5", image_url: "" },
    { user_name: "aaaaa", post_id: "post6", image_url: "" },
  ];
  return (
    <React.Fragment>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n) => {
          return <Card key={n.post_id} {...n} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;
