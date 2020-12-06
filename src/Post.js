import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { db } from "./firebase";
import firebase from "firebase";
import "./Post.css";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import FavoriteIcon from "@material-ui/icons/Favorite";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardLink,
  UncontrolledCollapse,
} from "reactstrap";

function Post({ username, user, postId, caption, imageUrl, profileUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [likes, setLikes] = useState([]);
  const [like, setLike] = useState("");
  
  const [disLikes, setDisLikes] = useState([]);
  const [disLike, setDisLike] = useState("");

  // console.log("this is likes-->", likes.length);

  let likesLength = likes.length;
  let disLikesLength = disLikes.length;
  // --------making comments handliner in db start--
  

 
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("dislikes")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setDisLikes(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  // --------making comments handliner in db end--

  // --------Posting comment to individual post start--
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  // possting likes to invidual post start----------------
  const postLike = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("likes").doc(`${user}`).set({
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setLike("");
  };

  // posting disLikes to invidual post start----------------
  const postDisLike = (event) => {
    event.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("dislikes")
      .doc(`${user}`)
      .set({
        username: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setDisLike("");
  };

  return (
    <div className="container">
      <Card className="rounded-0 shadow">
        <CardHeader tag="h5">
          <IconButton style={{ outlineStyle: "none" }}>
            <Avatar alt={username} src={profileUrl} />
          </IconButton>
          {username}
        </CardHeader>
        <CardImg
          className="rounded-0"
          top
          width="100%"
          src={imageUrl}
          alt="Loading"
        />

        <CardBody>
          <CardText className="font-weight-bold">{caption}</CardText>
          <CardLink>
            {/* --------------------------like button and input Start */}

            <Button
              color="primary"
              onClick={postLike}
              style={{ outlineStyle: "none", textTransform: "capitalize" }}
            >
              <ThumbUpAltOutlinedIcon
                style={{ color: "green" }}
                className="post__likeButton"
              ></ThumbUpAltOutlinedIcon>
              <span className="badge" style={{ fontSize: "small" }}>
                {likesLength}{" "}
              </span>
            </Button>
            {/* --------------------------dislike button and input Start*/}
            <Button
              onClick={postDisLike}
              // onClick={handleDisLike}
              style={{ outlineStyle: "none", textTransform: "capitalize" }}
              color="primary"
            >
              {" "}
              <ThumbDownOutlinedIcon
                style={{ color: "orange" }}
                className="post__dislikeButton"
              ></ThumbDownOutlinedIcon>
              <span className="badge" style={{ fontSize: "small" }}>
                {disLikesLength}{" "}
              </span>
            </Button>

            {/* --------------------------dislike button and input End*/}
          </CardLink>
          <CardLink>
            <Button
              style={{ outlineStyle: "none", textTransform: "capitalize" }}
              color="primary"
              id="toggler"
            >
              Comments
            </Button>
          </CardLink>
          <div></div>
          <div>
            {disLikes.map((disLike, index) => (
              <p key={index}>{disLike.text}</p>
            ))}
          </div>
          <div>
            <UncontrolledCollapse toggler="#toggler">
              <form>
                <input
                  type="text"
                  placeholder="Your comment..."
                  style={{ outlineStyle: "none" }}
                  className="post__input btn-block border-0 "
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  style={{ display: "none" }}
                  className="inline-block post__button"
                  disabled={!comment}
                  type="submit"
                  onClick={postComment}
                >
                  Post
                </button>
              </form>
              <Card>
                <CardBody className="post__comments">
                  {comments.map((comment) => (
                    <p key={comment.username}>
                      <strong style={{ fontSize: "small" }}>
                        {comment.username}{" "}
                      </strong>

                      <br />
                      {comment.text}
                    </p>
                  ))}
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Post;
