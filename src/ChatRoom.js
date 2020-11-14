import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./ChatRoom.css";

function ChatRoom({ message, info }) {
  console.log("This is ---> Message",message);
  console.log("This is ---> info",info);


  return <div className="chatRoom"></div>;
}

export default ChatRoom;

// export default Message;

//   const isUser = username;
//   return (
//     <div ref={ref} className={`chat ${isUser && "chat__user"}`}>
//       <Card  className={isUser ? "chat__userCard" : "chat__guestCard"}>
//         <CardContent>
//           <Typography color="white" style={{fontSize:"14px", fontWeight:"bold"}}>
//             {!isUser && `${username || "Unknown User"}:`}{" "}
//             {message.message}

//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// });
