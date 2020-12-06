import React, { forwardRef } from "react";
import "./ChatRoom.css";
import { Card, CardContent, Typography } from "@material-ui/core";
const MyMessages = forwardRef(({ message, username }, ref) => {
  // console.log("message---------------->", message);

  const isUser = username !== message.from;
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
            style={{ fontSize: "x-small", fontWeight: "bold", color: "white" }}
            color="white"
            variant="p"
            component="p"
          >
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});
export default MyMessages;
