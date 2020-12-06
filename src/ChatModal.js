import React, { useEffect, useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import { makeStyles } from "@material-ui/core/styles";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import {
  Avatar,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Input,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import "./ChatModal.css";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import FlipMove from "react-flip-move";
import OtherMessage from "./OtherMessage";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ListGroupItemHeading,
} from "reactstrap";
import { db } from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import MyMessages from "./MyMessages";

const ModalFocusAfterClose = (props) => {
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);

  const toggle = () => {
    setOpen(!open);
  };
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

  const mainUser = user?.email;
  // console.log(messages);
  // Chat Room adding data to database-------start
  const sendMessage = (e) => {
    e.preventDefault();
    if (mainUser) {
      db.collection("messages")
        .add({
          message: input,
          from: mainUser,
          to: props.name,
          sid: `${mainUser}_${props.name}`,
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

  const [myMessages, setMyMessages] = useState([]);
  const [otherMessage, setOtherMessage] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .where("sid", "==", `${mainUser}_${props.name}`)
      .orderBy("timestamp", "desc")
      .limit(3)
      .onSnapshot((snapshot) => {
        setMyMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    db.collection("messages")
      .where("sid", "==", `${props.name}_${mainUser}`)
      .orderBy("timestamp", "desc")
      .limit(3)
      .onSnapshot((snapshot) => {
        setOtherMessage(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });
  }, []);
  // console.log("myMessages---->", myMessages);
  // console.log("myMessages---->", otherMessage);

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
                  <DialogTitle id="responsive-dialog-title">
                    <ModalBody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <FlipMove>
                            <IconButton style={{ outlineStyle: "none" }}>
                              <Avatar>Me</Avatar>
                            </IconButton>
                            {myMessages.map(({ id, message }) => (
                              <MyMessages
                                key={id}
                                username={mainUser}
                                message={message}
                              />
                            ))}
                          </FlipMove>
                        </div>
                        <div>
                          <FlipMove>
                            <span
                              style={{
                                fontSize: "x-small",
                                color: "grey",
                                fontWeight: "bolder",
                              }}
                            >
                              <IconButton style={{ outlineStyle: "none" }}>
                                <Avatar src={props.proPic}></Avatar>
                              </IconButton>
                            </span>

                            {otherMessage.map(({ id, message }) => (
                              <OtherMessage
                                key={id}
                                username={mainUser}
                                message={message}
                              />
                            ))}
                          </FlipMove>
                        </div>
                      </div>
                    </ModalBody>
                  </DialogTitle>
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
                Engineer at Sundarban Industrial Complex Limited(Bashundhara
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <FlipMove>
                <IconButton style={{ outlineStyle: "none" }}>
                  <Avatar>Me</Avatar>
                </IconButton>

                {myMessages.map(({ id, message }) => (
                  <MyMessages key={id} username={mainUser} message={message} />
                ))}
              </FlipMove>
            </div>
            <div>
              <FlipMove>
                <span
                  style={{
                    fontSize: "x-small",
                    color: "grey",
                    fontWeight: "bolder",
                  }}
                >
                  <IconButton style={{ outlineStyle: "none" }}>
                    <Avatar src={props.proPic}></Avatar>
                  </IconButton>
                </span>

                {otherMessage.map(({ id, message }) => (
                  <OtherMessage
                    key={id}
                    username={mainUser}
                    message={message}
                  />
                ))}
              </FlipMove>
            </div>
          </div>
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
