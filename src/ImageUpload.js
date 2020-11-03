import React from "react";
import { Card, CardHeader, CardBody, CardText, Col } from "reactstrap";
import "./ImageUpload.css";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import MyModal from "./MyModal";



function ImageUpload() {


  return (
    <div className="image__upload " >
      <Col className=" col-sm-12 col-md-12 col-lg-12 col-xl-12  offset-sm-12 offset-md-12 offset-lg-12 offset-xl-12 ">
        <Card>
          <CardHeader>
            <MyModal/>
          </CardHeader>
          <CardBody>
            <CardText>
              <div
                className="
                    d-flex justify-content-sm-around  
                    d-flex justify-content-md-around
                    d-flex justify-content-lg-around
                    d-flex justify-content-xl-around"
              >
                <div className="feed__postIcon text-muted p-2 font-weight-bold">
                  <CameraAltOutlinedIcon style={{ color: "tomato" }} />
                  Photo
                </div>
                <div className="feed__postIcon text-muted p-2 ">
                  <VideocamOutlinedIcon style={{ color: "purple" }} />
                  Video
                </div>

                <div className="feed__postIcon text-muted p-2 font-weight-bold ">
                  <EventNoteOutlinedIcon style={{ color: "#b99494" }} />
                  Event
                </div>

                <div className="feed__postIcon p-2 text-muted font-weight-bold ">
                  <AssignmentOutlinedIcon style={{ color: "#0074b1" }} />
                  Write article
                </div>
                {/* ------------------Modal Start------------ */}

                <div className="feed__postIcon p-2  "></div>
                {/* -----------------Modal End------------------------------- */}
              </div>
            </CardText>
          </CardBody>
        </Card>
      </Col>
      
    </div>
  );
}

export default ImageUpload;
