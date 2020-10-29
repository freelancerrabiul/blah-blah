import React from "react";
import "./Cards.css";
import { CardImg, CardTitle, CardText, CardBody } from "reactstrap";

const Cards = ({ email, firstname, lastname, about, profilePic }) => {

  const sendDataToMyConnection = () => {
   
 

  }


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
          <button onClick={sendDataToMyConnection} className="btn btn-block btn-sm btn-outline-info">
            Connect
          </button>
        </CardBody>
      </div>
    </div>
  );
};
export default Cards;
