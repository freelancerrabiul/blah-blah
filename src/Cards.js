import React, { useEffect, useState } from "react";
import "./Cards.css";
import { CardImg, CardTitle, CardText, CardBody } from "reactstrap";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import firebase from "firebase";

const Cards = ({ email, firstname, lastname, about, profilePic }) => {
  const [mainUserProfileInfo, setMainUserProfileInfo] = useState([]);
  const [{ user }] = useStateValue();
  const mainUser = user?.email;
  const dbRootOfMyConnection = db
    .collection("users")
    .doc(`${email}`)
    .collection("pending_connections")
    .doc(`${mainUser}`);

  useEffect(() => {
    if (mainUser) {
      db.collection("users")
        .where("email", "==", mainUser)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            setMainUserProfileInfo(doc.data());
          });
        });
    } else {
      console.log("There is no users from cads.js");
    }
  }, [mainUser]);

  // console.log(mainUserProfileInfo.profilePic);

  const sendDataToMyConnection = (event) => {
    event.preventDefault();
    dbRootOfMyConnection.set({
      requestSender: mainUser,
      profileLink: mainUserProfileInfo.profilePic,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div className="column">
      <div className="card shadow">
        <CardImg
          className="cards__img"
          top
          width="100%"
          src={profilePic}
          alt="Loading..."
        />
        <CardBody>
          <CardTitle>
            {" "}
            {firstname}
            {lastname}{" "}
          </CardTitle>

          <CardText className="cards__text">{email}</CardText>
          <button
            onClick={sendDataToMyConnection}
            className="btn btn-block btn-sm btn-outline-info"
          >
            Connect
          </button>
        </CardBody>
      </div>
    </div>
  );
};
export default Cards;
