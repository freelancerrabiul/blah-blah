import React, { forwardRef } from "react";
import "./ChatRoom.css";
import { Card, CardContent, Typography } from "@material-ui/core";
const OtherMessage = forwardRef(({ message, username }, ref) => {
  // console.log("message---------------->", message);
  const isUser = username !== message.from;

  if (message) {
    return (
      <div ref={ref} className={`message ${isUser && "message__user"}`}>
        <span
          style={{
            fontSize: "x-small",
            color: "grey",
            fontWeight: "bolder",
          }}
        >
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </span>
        <Card className={isUser ? "message__userCard" : "message__guestCard"}>
          <CardContent>
            <Typography
              style={{
                fontSize: "x-small",
                fontWeight: "bold",
                color: "white",
              }}
              color="white"
              variant="p"
              component="p"
            ></Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
});
export default OtherMessage;
