import React from "react";
import "./Cards.css";
import { CardImg, CardTitle, CardText, CardBody } from "reactstrap";

const Cards = ({ email, firstname, lastname, about, profilePic }) => {
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
          <CardTitle className="shadow">
            {" "}
            {firstname}
            {lastname}{" "}
          </CardTitle>
          {/* <CardSubtitle> {email} </CardSubtitle> */}
          <CardText className="cards__text">{email}</CardText>
          <button className="btn btn-block btn-sm btn-outline-info">
            Connect
          </button>
        </CardBody>
      </div>
    </div>
  );
};
export default Cards;
