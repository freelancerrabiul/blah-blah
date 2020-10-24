import React from "react";
import Header from "./Header";
import Post from "./Post";

function Feed() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="
        
          mt-sm-5 mt-md-5 mt-lg-5 mt-xl-5
          pt-sm-5 pt-md-5 pt-lg-5 pt-xl-5 
          col-sm-10 col-md-10 col-lg-10 col-xl-10 
          offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1        
       ">
          <Post />
        </div>
      </div>
    </div>
  );
}

export default Feed;
