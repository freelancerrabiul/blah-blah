import React, { forwardRef } from "react";

import { Card, CardContent, Typography } from "@material-ui/core";
import "./Disco.css";

const Disco = forwardRef(({ message, mainUser }, ref) => {
  console.log(message);
  const isUser = mainUser === message.username;
  const isNotUser = (mainUser = message.username);

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${message.username || "Unknown User"}:`}{" "}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Disco;
