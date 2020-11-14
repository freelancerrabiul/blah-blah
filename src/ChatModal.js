import React, { useEffect, useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import { makeStyles } from "@material-ui/core/styles";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import { Avatar, Button, Divider, FormControl, Input } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import "./ChatModal.css";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import FlipMove from "react-flip-move";
import ChatRoom from "./ChatRoom";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ListGroupItemHeading,
} from "reactstrap";
import { db } from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

const ModalFocusAfterClose = (props) => {
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);

  const toggle = () => setOpen(!open);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
      appBar: {
        position: "relative",
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
    },
  }));

  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  const classes = useStyles();
  const [fullScreenOpen, setFullScreenOpen] = React.useState(false);
  const handleClickOpen = () => {
    setFullScreenOpen(true);
  };

  const handleClose = () => {
    setFullScreenOpen(false);
  };

  // Chat Room things
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const mainUser = user?.email;
  // Chat Room adding data to database-------start
  const sendMessage = (e) => {
    e.preventDefault();
    if (mainUser) {
      db.collection("users")
        .doc(props.name)
        .collection("messages")
        .doc(mainUser)
        .collection(`${mainUser}`)
        .doc()
        .set({
          message: input,
          username: mainUser,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          console.log("Document successfully added!");
          setInput("");
        })
        .catch(function (error) {
          console.error("Error adding document:-->ChatModal-87 ", error);
        });
    } else {
      console.log(" operation failed:-->ChatModal-87 ");
    }
  };

  // Chat Room adding data to database--------end

  // Chat Room things
  // Chat Room grabing data from database

  useEffect(() => {
    if (props.name) {
      db.collection("users")
        .doc(mainUser)
        .collection("messages")
        .doc(props.name)
        .collection(props.name)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              message: doc.data(),
            }))
          );
        });
    } else {
      console.log("oparation failed");
    }
  }, [props.name, mainUser]);

  useEffect(() => {
    if (props.name) {
      db.collection("users")
        .doc(props.name)
        .collection("messages")
        .doc(mainUser)
        .collection(mainUser)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              info: doc.data(),
            }))
          );
        });
    } else {
      console.log("oparation failed");
    }
  }, [props.name, mainUser]);

  // Chat Room grabing data from database

  return (
    <div>
      <form inline onSubmit={(e) => e.preventDefault()}>
        <Button
          onClick={toggle}
          style={{
            fontSize: "16px",
            outline: "none",
            color: "rgb(64, 192, 96)",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
        >
          <ChatIcon fontSize="small" style={{ color: "orange" }} />
          Message
        </Button>
      </form>
      <Modal
        scrollable
        contentClassName={
          isActive ? "ChatModal__customModalStyle" : "normalStyle"
        }
        centered
        fade={false}
        returnFocusAfterClose={focusAfterClose}
        isOpen={open}
      >
        <ModalHeader style={{ height: "8vh" }} toggle={toggle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  className="pr-4"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  New Message
                </p>
              </div>
              <div>
                {isActive ? (
                  <UnfoldLessIcon
                    className="mb-2 "
                    fontSize="small"
                    onClick={handleToggle}
                  />
                ) : (
                  <UnfoldMoreIcon
                    className="mb-2"
                    fontSize="small"
                    onClick={handleToggle}
                  />
                )}
              </div>
              <div className="pl-4">
                <FullscreenIcon className="mb-2" onClick={handleClickOpen} />

                <Dialog fullScreen open={fullScreenOpen} onClose={handleClose}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <FullscreenExitIcon />
                    </IconButton>
                  </Toolbar>
                </Dialog>
              </div>
            </div>
          </div>
          <Divider light />
        </ModalHeader>

        <div
          className=" ChatModal__myDiv p-sm-2 p-md-1 p-lg-2 p-xl-2 pb-sm-0 pb-md-0 pb-lg-0 pb-xl-0"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div className="pr-1">
            <Avatar
              src={props.proPic}
              alt="Remy Sharp"
              width="100%"
              style={{ objectFit: "contain" }}
              className={classes.large}
            />
          </div>
          <div className="">
            <ListGroupItemHeading
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              {props.name}
            </ListGroupItemHeading>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "grey",
                }}
              >
                Engineer at Sundarban Industrial Complex Limited( Bashundhara
                Group)
                <p
                  style={{
                    marginBottom: "-15px",
                    fontSize: "12px",
                    color: "grey",
                  }}
                >
                  Connected 4 hours ago
                </p>
              </p>
            </div>
          </div>
        </div>

        <Input
          fullWidth
          className="app__input pl-1"
          placeholder="inter your message..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <ModalBody>
          <FlipMove>
            {messages.map(( message, info, index ) => (
              <ChatRoom
                key={index}
                username={mainUser}
                info={info}
                message={message}
              />
            ))}
          </FlipMove>
        </ModalBody>
        <div
          className="p-1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9fafc",
            borderTop: "1px solid lightgrey",
          }}
        >
          <Button
            style={{ fontSize: "14px", textTransform: "capitalize" }}
            size="small"
            color="primary"
            onClick={sendMessage}
            disabled={!input}
          >
            Send
          </Button>
          <Button
            style={{ fontSize: "14px", textTransform: "capitalize" }}
            size="small"
            color="primary"
            onClick={toggle}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalFocusAfterClose;
