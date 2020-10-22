import React from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  CardColumns,
} from "reactstrap";

const Cards = ({ email, firstname, lastname, about, profilePic }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardImg top width="100%" src={profilePic} alt="Loading" />
        <CardBody>
          <CardTitle>
            {" "}
            {firstname} {lastname}
          </CardTitle>
          <CardSubtitle>{email}</CardSubtitle>
          <CardText>{about}</CardText>
          <button className=" btn btn-block btn-outline-info font-weight-bold">
            Connect
          </button>
        </CardBody>
      </Card>
    </div>
  );
};
export default Cards;
