import React from "react";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";

function People(props) {
  let history = useHistory();
  const handleClick = () => {
    db.collection("users").doc(props.text).collection("messages").add({
      message: "wsdfsdcsdcvsdzcsdzcsdc",
    });
  };
  return (
    <div className="card" style={{ width: "36rem" }}>
      <ol class="list-group list-group-flush">
        <li className=" list-group-item my-3">
          {" "}
          {props.text}
          <button
            onClick={handleClick}
            style={{ width: "120px" }}
            className="btn btn-outline-success btn-sm ml-4"
          >
            Send a message
          </button>
        </li>
      </ol>
    </div>
  );
}

export default People;
