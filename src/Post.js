import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { db } from "./firebase";
import firebase from "firebase";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import "./Post.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

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

  // const [like, setLike] = useState([]);
  const [dbLike, setDbLike] = useState([]);
  console.log("--->database likes", dbLike);
  // --------making comments handliner in db start--
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
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
  // --------Posting comment to individual post start--

  // possting likes to nvidual post start----------------

  // possting likes to nvidual post end------------------
  const [counter, setCounter] = useState([]);

  // useEffect(() => {
  //   let unsubscribe;
  //   if (postId) {
  //     unsubscribe = db
  //       .collection("posts")
  //       .doc(postId)
  //       .collection("likes")
  //       .onSnapshot((snapshot) => {
  //         setLike(snapshot.docs.map((doc) => doc.data()));
  //       });
  //   }
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [postId]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(postId)
        .get()
        .then((doc) => {
          setDbLike(doc.data());
        });
    } else {
    }
  }, [postId]);
  let databaseLikes = dbLike?.like;
  // console.log("likes-->", bbc);

  // function count() {
  //   let counter = bbc;
  //   counter++;
  //   setCounter(counter);
  //   db.collection("posts").doc(postId).collection("likes").doc(postId).set(
  //     {
  //       like: counter,
  //     },
  //     { merge: true }
  //   );
  // }
  const [liked, setLiked] = useState(false);
  console.log(liked);

  // const[postLike,setPostLike] = useState("")
  // console.log(postLike);

  let likes = databaseLikes;
  const handleSetLikeToTrue = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("likes").doc(postId).set(
      {
        like: likes + 1,
      },
      { merge: true }
    );

    setLiked(true);
  };

  const handleSetLikeToFalse = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("likes").doc(postId).set(
      {
        like: likes 
      },
      { merge: true }
    );
    setLiked(false);
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
            {liked ? (
              <ThumbUpIcon fontSize="large" onClick={handleSetLikeToFalse} />
            ) : (
              <ThumbUpAltOutlinedIcon
                fontSize="large"
                onClick={handleSetLikeToTrue}
              />
            )}
              <input type="text" value={liked ? likes + 1 : likes} />
            {/* <input type="text" value={liked ? likes + 1 : likes} />  */}
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
                  type="submit"
                  style={{ display: "none" }}
                  className="inline-block"
                  disabled={!comment}
                  className="post__button"
                  type="submit"
                  onClick={postComment}
                >
                  Post
                </button>
              </form>
              <Card>
                <CardBody className="post__comments">
                  {comments.map((comment) => (
                    <p>
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
