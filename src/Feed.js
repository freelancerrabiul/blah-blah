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

  const email = user?.email;
  // snatching post data from db and giving it to post.js as props

  useEffect(() => {
    if (setPosts) {
      db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
    }else{
      console.log("USeEffect from Feed.js-->29");
    }
  }, [setPosts]);
  // ------------------end--->

  // -------getting the profile pic of user from db----

  // -------getting the profile pic of user end----
  return (
    <div className="container">
      <div className="row">
        <div
          className="        
          mt-sm-5 mt-md-5 mt-lg-5 mt-xl-5
          pt-sm-1 pt-md-1 pt-lg-1 pt-xl-1
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
              profileUrl={post.profileOwner}
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
