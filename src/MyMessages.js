import React from "react";
import "./ChatRoom.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useSpring, animated } from "react-spring";

function MyMessages({ message }) {
  const springStyle = useSpring({
    transform: "translate3d(0,-40px,0)",
    opacity: 1,
    from: { transform: "translate3d(0,0px,0)", opacity: 0 },
    to: { transform: "translate3d(0,-40px,0)", opacity: 1 },
  });

  return (
    <animated.div style={springStyle} className="message__me">
      <div style={{ textAlign: "left" }}>
        <span
          style={{
            fontSize: "x-small",
            color: "grey",
            fontWeight: "bolder",
          }}
        >
          {new Date(message.timestamp?.toDate()).toUTCString() == "Invalid Date"
            ? "Loading..."
            : new Date(message.timestamp?.toDate()).toUTCString()}
        </span>
      </div>
      <Card className="message__myCard">
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
          >
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </animated.div>
  );
}

export default MyMessages;
