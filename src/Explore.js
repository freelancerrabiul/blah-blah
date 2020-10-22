import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Cards from "./Cards";
import { db } from "./firebase";
import "./Explore.css"

import { useStateValue } from "./StateProvider";

function Explore() {
  const [{ user }] = useStateValue();
  const email = user?.email;
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setPeoples(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          people: doc.data(),
        }))
      );
    });
  }, []);

  let peopleLength = peoples.length;
  if (peopleLength) {
    return (
      <div className="explore ">
        {peoples.map(({ id, people }) => (
          <Cards
            key={id}
            email={email}
            firstname={people.firstname}
            lastname={people.lastname}
            about={people.about}
            profilePic={people.profilePic}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="">
        <h1>Hello</h1>
      </div>
    );
  }
}

export default Explore;
