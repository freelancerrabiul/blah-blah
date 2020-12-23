import React, { useEffect, useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import { makeStyles } from "@material-ui/core/styles";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import {
  Avatar,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import OtherMessage from "./OtherMessage";
import "./ChatModal.css";
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
import MyLiveMessage from "./MyLiveMessage";
import OLiveMessages from "./OLiveMessages";
import { Link, Redirect } from "react-router-dom";
import MyModalBody from "./MyModalBody";

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

  const [fullWidth, setFullWidth] = React.useState(false);

  // Chat Room grabing data from database

  const handleScroll = (e) => {
    // console.log(e.target.style.width);
  };

  // <<--    database stuff and pagination for myMessages   {START}   -->


  // <<--    database stuff and pagination for OtherMessage  {END}   -->
  const [myLiveMessages, setMyLiveMessages] = useState([]);
  const [othersLiveMessages, setOthersLiveMessages] = useState([]);

  const [openDiv, setOpenDiv] = useState(true);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .where("sid", "==", `${props.name}_${mainUser}`)
      .limit(10)
      .onSnapshot((snapshot) => {
        setOthersLiveMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .where("sid", "==", `${mainUser}_${props.name}`)
      .limit(10)
      .onSnapshot((snapshot) => {
        setMyLiveMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const handleScrollForChangingDiv = () => {
    setOpenDiv(false);
  };

  return (
    <div>
      <form inline="true" onSubmit={(e) => e.preventDefault()}>
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
        fullWidth={fullWidth}
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
                To
                <Avatar
                  src={props.proPic}
                  alt="Remy Sharp"
                  width="100%"
                  style={{ objectFit: "contain" }}
                  className={classes.small}
                />
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
                  <ModalHeader>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <FullscreenExitIcon />
                    </IconButton>
                  </ModalHeader>
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
          <div className="">
            <ListGroupItemHeading
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              {props.name}
            </ListGroupItemHeading>
          </div>
        </div>

        <Input
          fullwidth
          className="app__input pl-1"
          placeholder="Inter your message..."
          value={input}
          onClick={() => {
            setOpenDiv(true);
          }}
          multiline
          onChange={(event) => setInput(event.target.value)}
        />

        {openDiv === true ? (
          <ModalBody
            onScroll={handleScrollForChangingDiv}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              {myLiveMessages.map(({ message, id }) => (
                <MyLiveMessage key={id} message={message} />
              ))}
            </div>

            <div>
              {othersLiveMessages.map(({ message, id }) => (
                <OLiveMessages key={id} message={message} mainUser={mainUser} />
              ))}
            </div>
          </ModalBody>
        ) : (
          <ModalBody>
             
            <MyModalBody
              // myMessages={myMessages}
              // loading={loading}
              // isEmpty={isEmpty}
              // othersMessage={othersMessage}
              // loadingDataOfOthers={loadingDataOfOthers}
              // isOtherDataEmpty={isOtherDataEmpty}
              // isOtherDataEmpty={isOtherDataEmpty}
              // loadMoreOfOthersMessage={loadMoreOfOthersMessage}
              // loadMoreOfMyMessage={loadMoreOfMyMessage}
              propName = {props.name}
              mainUser={mainUser}

            />
          </ModalBody>

          // <ModalBody className="p-2">

          //   <div style={{ display: "flex", justifyContent: "space-between" }}>
          //     {/* MyMessages function START from here */}
          //     <div style={{ padding: "2vh 2vw", display: "inline" }}>
          //       {myMessages === 0 ? (
          //         <p>loading...</p>
          //       ) : (
          //         myMessages.map((message) => (
          //           <MyMessages key={message} message={message} />
          //         ))
          //       )}

          //       <div style={{ textAlign: "center" }}>
          //         {loading && (
          //           <Button
          //             style={{
          //               outlineStyle: "none",
          //               textTransform: "capitalize",
          //             }}
          //           >
          //             getting data...
          //           </Button>
          //         )}
          //         {!loading && !isEmpty && (
          //           <Button
          //             style={{
          //               outlineStyle: "none",
          //               textTransform: "capitalize",
          //             }}
          //             onClick={loadMoreOfMyMessage}
          //           >
          //             More
          //           </Button>
          //         )}
          //         {isEmpty && (
          //           <p style={{ fontWeight: "bold" }}>
          //             There are no more data
          //           </p>
          //         )}
          //       </div>
          //     </div>
          //     {/* MyMessages function END here */}

          //     {/* OthersMessage function START here */}
          //     <div style={{ padding: "2vh 2vw", display: "inline" }}>
          //       <div>
          //         {othersMessage === 0 ? (
          //           <p>loading...</p>
          //         ) : (
          //           othersMessage.map((message, index) => (
          //             <OtherMessage key={index} message={message} />
          //           ))
          //         )}
          //       </div>

          //       <div style={{ textAlign: "center" }}>
          //         {loadingDataOfOthers && (
          //           <Button
          //             style={{
          //               outlineStyle: "none",
          //               textTransform: "capitalize",
          //             }}
          //           >
          //             getting data...
          //           </Button>
          //         )}
          //         {!loadingDataOfOthers && !isOtherDataEmpty && (
          //           <Button
          //             style={{
          //               outlineStyle: "none",
          //               textTransform: "capitalize",
          //             }}
          //             onClick={loadMoreOfOthersMessage}
          //           >
          //             More
          //           </Button>
          //         )}
          //         {isOtherDataEmpty && (
          //           <p style={{ fontWeight: "bold" }}>
          //             There are no more data
          //           </p>
          //         )}
          //       </div>
          //     </div>
          //     {/* OthersMessage function END Here here */}
          //   </div>
          // </ModalBody>
        )}

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
