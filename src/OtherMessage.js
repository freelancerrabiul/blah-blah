import React from "react";
import "./ChatRoom.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useSpring, animated } from "react-spring";

const OtherMessage = ({ message }) => {
  const springStyle = useSpring({
    transform: "translate3d(0,-40px,0)",
    from: { transform: "translate3d(0,0px,0)" },
    to: { transform: "translate3d(0,-40px,0)" },
  });  return (
    <animated.div className="message__other" style={springStyle}>
      <span
        style={{
          fontSize: "x-small",
          color: "grey",
          fontWeight: "bolder",
        }}
      >
        {new Date(message.timestamp?.toDate()).toUTCString()}
      </span>
      <Card className="message__otherCard">
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
};
export default OtherMessage;
