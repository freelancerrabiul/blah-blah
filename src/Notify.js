import React, { useEffect, useState } from "react";
import "./Notify.css";
import { Container, Row } from "reactstrap";
import { db } from "./firebase";
import firebase from "firebase";

import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import { useStateValue } from "./StateProvider";
import { ButtonGroup } from "@material-ui/core";

function Notify() {
  const [{ user }] = useStateValue();
  const [timestamp, setTimestamp] = useState([]);
  const [length, setLength] = useState([]);
  const [paradox, setParadox] = useState("");
  const mainUser = user?.email;

  useEffect(() => {
    if (mainUser) {
      db.collection("users")
        .doc(mainUser)
        .collection("pending_connections")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setLength(snapshot.docs.map((doc) => doc.data()));
          setOther(snapshot.docs.map((doc) => doc.data().requestSender));
          setTimestamp(snapshot.docs.map((doc) => doc.data().timestamp));
        });
    } else {
      console.log("Cant get the Main user data");
    }
  }, [mainUser]);

  // console.log(length);
  useEffect(() => {
    if (timestamp) {
      timestamp.forEach((time) => setParadox(time));
    } else {
      console.log("Operation failed useEffect notify--->43");
    }
  }, [timestamp, paradox]);

  var convertingToSecond = paradox.seconds;
  var time = new Date(convertingToSecond * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[time.getMonth()];
  let date = time.getDate();
  let day = days[time.getDay()];
  let hour = time.getHours();
  let minute = time.getMinutes();

  let prepand = hour >= 12 ? " PM " : " AM ";
  hour = hour >= 12 ? hour - 12 : hour;
  if (hour === 0 && prepand === " PM ") {
    if (minute === 0) {
      hour = 12;
      prepand = " Noon";
    } else {
      hour = 12;
      prepand = " PM";
    }
  }
  if (hour === 0 && prepand === " AM ") {
    if (minute === 0) {
      hour = 12;
      prepand = " Midnight";
    } else {
      hour = 12;
      prepand = " AM";
    }
  }
  if (minute < 10) {
    minute = "0" + minute;
  } else {
  }

  const [checkUser, setCheckUser] = useState();
  const [other, setOther] = useState("");
  const [checkOthersProfilePicUrl, setCheckOthersProfilePicUrl] = useState("");

  const handleAccept = (e) => {
    e.preventDefault();
    var otherUser = other.includes(checkUser);
    if (otherUser === true) {
      db.collection("users")
        .doc(mainUser)
        .collection("my_connection")
        .doc(checkUser)
        .set({
          friendName: mainUser,
          profileLink: checkOthersProfilePicUrl,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          console.log("Document successfully added!");
        })
        .catch(function (error) {
          console.error("Error adding document:-->Notify-120 ", error);
        });
    } else {
      console.log("otherUser does't inClude(checkUSer)");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    var otherUser = other.includes(checkUser);
    if (otherUser === true) {
      db.collection("users")
        .doc(mainUser)
        .collection("pending_connections")
        .doc(checkUser)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error Deleting document:-->Notify-142 ", error);
        });
    } else {
      console.log("otherUser does't inClude(checkUSer)");
    }
  };

  console.log(checkOthersProfilePicUrl);
  console.log(checkUser);
  return (
    <Container className="notify themed-container pt-4" fluid={false}>
      <Container className="notify themed-container " fluid={true}>
        <Row className="p-2" xs="1" sm="2" md="4">
          {length.map((person) => (
            <Card className="shadow-lg">
              <CardImg
                className="cards__img"
                top
                width="100%"
                src={person.profileLink}
                alt="Loading"
              />
              <CardBody>
                <CardTitle>{person.requestSender}</CardTitle>

                <CardText>
                  <ButtonGroup size="sm">
                    {/* <input
                        className="w-50"
                        style={{opacity:"0", position:"absolute"}}
                        type="text"
                        onMouseOver={pppp}
                        value={person.profileLink}
                      /> */}
                    <Button
                      style={{
                        outlineStyle: "none",
                        fontSize: "x-small",
                        textAlign: "center",
                      }}
                      className="notify__button pb-4 pr-5 border-0 font-weight-bold"
                      outline
                      color="success"
                      value={person.requestSender}
                      onMouseOver={(e) => setCheckUser(e.target.value)}
                      onClick={handleAccept}
                    >
                      Accept
                      <button
                        className="font-weight-bold pb-4 notify__modifiedButton"
                        style={{
                          opacity: "0",
                          outlineStyle: "none",
                          position: "absolute",
                          border: "none",
                          color: "green",
                          background: "white",
                        }}
                        onMouseOver={(e) =>
                          setCheckOthersProfilePicUrl(e.target.value)
                        }
                      
                        value={person.profileLink}
                      ></button>
                    </Button>

                    <Button
                      style={{ outlineStyle: "none", fontSize: "x-small" }}
                      className="notify__button pb-4 pr-5 border-0 font-weight-bold"
                      outline
                      color="danger"
                      value={person.requestSender}
                      onMouseOver={(e) => setCheckUser(e.target.value)}
                      onClick={handleDelete}
                    >
                      Decline
                    </Button>
                  </ButtonGroup>
                </CardText>
              </CardBody>

              <small className="notify__text left p-2 text-muted badge">
                · {date} {month} {day} {hour}: {minute}
                {prepand}{" "}
              </small>
            </Card>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Notify;
