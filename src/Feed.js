import React, { useEffect, useState } from "react";
import "./Feed.css";
import ImageUpload from "./ImageUpload";
import Post from "./Post";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function Feed() {
  // belong to posts
  const [posts, setPosts] = useState([]);
  const [{ user }] = useStateValue();
  const [profile, setProfile ] = useState([]);
  const email = user?.email;
  // snatching post data from db and giving it to post.js as props
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  // ------------------end--->

  
  // -------getting the profile pic of user from db----

  useEffect(() => {
    db.collection("users")
      .doc(`${email}`)
      .get()
      .then((doc) => {
        setProfile(doc.data())
      });
  }, [email]);
  // -------getting the profile pic of user end----
  return (
    <div className="container">
      <div className="row">
        <div
          className="        
          mt-sm-5 mt-md-5 mt-lg-5 mt-xl-5
          pt-sm-5 pt-md-5 pt-lg-5 pt-xl-5 
          col-sm-10 col-md-10 col-lg-10 col-xl-10 
          offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1        
          "
        >
          <div
            className="        
         
          col-sm-10 col-md-10 col-lg-10 col-xl-10
          offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1        
          "
          >
            <ImageUpload />
          </div>
          {posts.map(({ id, post }) => (
            <Post
             profileUrl={profile?.profilePic}
              key={id}
              postId={id}
              user={email}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
