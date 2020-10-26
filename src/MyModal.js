import React, {  useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { makeStyles } from "@material-ui/core/styles";
import { db, storage } from "./firebase";
import firebase from "firebase";




// --------progresbar from meterial ui----------------
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// ------------------------

// Button icon from meterial ui-----
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import DuoOutlinedIcon from "@material-ui/icons/DuoOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
// --------------
import { useStateValue } from "./StateProvider";


const MyModal = (props) => {
  const [image, setImage] = useState(null);
  const [{ user }] = useStateValue();
  const email = user?.email; 
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");




  // ----------------------meterial ui progressbar----------------------------------------------------

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="80%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };




  // --------------------------------------------------------------------------

  // modal file upload logic-------meterial ui------
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      root: {
        width: "100%",
      },
    },
    input: {
      display: "none",
    },
  }));
  const classes = useStyles();
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  // modal file upload logic end-------------
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


// My file ---sending to db ---------------------
  const handleUpload = () => {
    const uploadTask = storage.ref(`postPhotos/${image.name}`).put(image);
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
          .ref("postPhotos")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image get inside of db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: email,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            setModal(false)
          });
      }
    );
  };

  return (
    <div>
      <Button
        style={{ outlineStyle: "none" }}
        className="feed_button btn-block border-0"
        variant="outlined"
        role="button"
        onClick={toggle}
      >
        {" "}
        <PostAddIcon />
        <span
          className="feed__buttonSpan
                
                     btn-block text-left
                     pull-left border-0
                     font-weight-bold 
                     rounded-0 text-muted
                     text-capitalize"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          {" "}
          Start a Post
        </span>
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{email}</ModalHeader>
        <ModalBody>
          <textarea
            placeholder="Write something ...."
            onChange={(event) => setCaption(event.target.value)}
            value={caption}
            className="feed__postTextArea border-0"
            cols="55"
            rows="7"
            type="text"
          ></textarea>
          <br />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              <AddPhotoAlternateOutlinedIcon />
              <DuoOutlinedIcon />
            </Button>
          </label>

          <div className={classes.root}>
            <LinearProgressWithLabel value={progress} />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            style={{ outlineStyle: "none" }}
            onClick={handleUpload}
            component="span"
          >
            Post
            <SendOutlinedIcon />
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
};

export default MyModal;
