import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ProfileInfo.css";
import { useStateValue } from "./StateProvider";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


function ProfileInfo() {
  const [{ user }] = useStateValue();

  let history = useHistory();
  const email = user?.email;  
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [about, setAbout] = useState("");
  const [bday, setBday] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const sendDataTodb = () => {
    db.collection("users")
      .doc(`${email}`)
      .set(
        {
          firstname: fn,
          lastname: ln,
          email: email,
          about: about,
          gender: gender,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(function () {
        return history.push("/feed");
      })
      .catch(function (error) {
        console.log(
          "Error writing document>>>>>>>>>>>>>>>>>>>>>>>>>>>: ",
          error
        );
      });

    setFn("");
    setLn("");
    setAbout("");
    setBday("");
    setGender("");
  };
  const redirectToFeed = () => {
    history.push("/feed");
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //  the progress bar--->
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress func..
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error func...
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {            
            //post image get inside of db
            db.collection("users").doc(`${email}`).update({
              profilePic: url,
            });
            setProgress(0);
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="container profileInfo  bg-light align-items-sm-center ">
      <h4 className="text-center text-sm-center text-lg-center text-xl-center text-md-center">
        Provide Your Profile Information
      </h4>
      <div className="grid ProfileInfo__form align-items-sm-center ">
        <div className="col-6 offset-4 form  d-flex align-items-sm-center">
          <Form>
            <FormGroup>
              <Label for="exampleText">First name</Label>
              <Input
                value={fn}
                onChange={(e) => setFn(e.target.value)}
                type="text"
                name="text"
                id="exampleEmail"
                placeholder="Your first name"
              />
              <Label for="exampleText">Last Name</Label>
              <Input
                value={ln}
                onChange={(e) => setLn(e.target.value)}
                type="text"
                name="text"
                id="exampleText"
                placeholder="Last name"
              />
              <Label for="exampleDate">Your birth-date</Label>
              <Input
                value={bday}
                onChange={(e) => setBday(e.target.value)}
                type="date"
                name="date"
                id="exampleDate"
              />
              <Label for="exampleText">About</Label>
              <Input
                style={{ height: "50px" }}
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength="130"
                name="text"
                id="exampleText"
              />
              <Label for="exampleFile">Profile Photo</Label>

              <div className="imageupload">
                <div className="w-25 p-3">
                  <CircularProgressbar                    
                    value={progress}
                    maxValue={100}
                    text={`${progress * 1}%`}
                  />
                </div>

                <input type="file" onChange={handleChange} />
                <Button onClick={handleUpload}>Upload</Button>
              </div>

              <legend style={{ fontSize: "medium" }}>Gender</legend>
              <Label className="ml-3" check>
                <Input
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="radio1"
                />
                MALE
              </Label>
              <Label className="ml-5" check>
                <Input
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="radio1"
                />{" "}
                Female
              </Label>
            </FormGroup>

            <Button
              disabled={!fn || !ln || !bday || !about || !gender}
              onClick={sendDataTodb}
              className="btn btn-success"
            >
              Save
            </Button>
            <Button
              style={{ marginLeft: "170px" }}
              onClick={redirectToFeed}
              className="btn btn-warning"
            >
              Close
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default ProfileInfo;
