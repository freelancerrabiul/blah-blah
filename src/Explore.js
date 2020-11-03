import React, { useEffect, useState } from "react";

import Cards from "./Cards";
import { db } from "./firebase";
import "./Explore.css";



function Explore() {

 
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    if(peoples){
      db.collection("users").onSnapshot((snapshot) => {
        setPeoples(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            people: doc.data(),
          }))
        );
      });
    }else{
      console.log("not yet...");
    }
   
  }, [peoples]);

  let peopleLength = peoples.length;
  if (peopleLength) {
    return (
      <div class="container">
        <div class="row">
          <div class="col exploreTo__cards">
            {peoples.map(({ id, people }) => (
              <Cards
                key={id}
                email={people.email}
                firstname={people.firstname}
                lastname={people.lastname}
                about={people.about}
                profilePic={people.profilePic}
              />
            ))}
          </div>
        </div>
      </div>
    );

  } else {
    return (
      <div class="loader">
        <div class="loader-inner">
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;
