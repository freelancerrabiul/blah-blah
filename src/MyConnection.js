import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ChatModal from "./ChatModal";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import PopupState from "./PopupState";
import SearchButton from "./SearchButton";
import { Avatar, Divider } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function MyConnection(props) {
  const { className } = props;

  const [{ user }] = useStateValue();
  const [timestamp, setTimestamp] = useState([]);
  const [friends, setFriends] = useState([]);
  const [paradox, setParadox] = useState("");
  const mainUser = user?.email;

  useEffect(() => {
    if (mainUser) {
      db.collection("users")
        .doc(mainUser)
        .collection("my_connections")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setFriends(snapshot.docs.map((doc) => doc.data()));
          setTimestamp(snapshot.docs.map((doc) => doc.data().timestamp));
        });
    } else {
      console.log("Cant get the my_connections data");
    }
  }, [mainUser]);

  useEffect(() => {
    if (timestamp) {
      timestamp.forEach((time) => setParadox(time));
    } else {
      console.log("Operation failed useEffect notify--->43");
    }
  }, [timestamp, paradox]);

  var convertingToSecond = paradox.seconds;
  var time = new Date(convertingToSecond * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[time.getMonth()];
  let date = time.getDate();
  let day = days[time.getDay()];
  let hour = time.getHours();
  let minute = time.getMinutes();

  let prepand = hour >= 12 ? " PM " : " AM ";
  hour = hour >= 12 ? hour - 12 : hour;
  if (hour === 0 && prepand === " PM ") {
    if (minute === 0) {
      hour = 12;
      prepand = " Noon";
    } else {
      hour = 12;
      prepand = " PM";
    }
  }
  if (hour === 0 && prepand === " AM ") {
    if (minute === 0) {
      hour = 12;
      prepand = " Midnight";
    } else {
      hour = 12;
      prepand = " AM";
    }
  }
  if (minute < 10) {
    minute = "0" + minute;
  } else {
  }

  const [readInfo, setReadInfo] = useState("");

  // dialog modal-----------------------------

  const classes = useStyles();

  // dialog modal-----------------------------

  return (
    <div className="container">
      <h6 className="p-2 font-weight-bold text-md-center text-lg-center text-xl-center">
        Drive more leads… Tune in to learn how to drive more leads on Blah Blah
      </h6>
      <div
        className="container border-bottom-0"
        style={{ backgroundColor: "white", border: "1px solid lightgrey" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} className=" pt-4 pb-1">
            <div>
              <h6>Connections {friends.length} </h6>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div>
                  <PopupState />
                </div>
              </div>

              <div
                className="p-2"
                style={{ display: "flex", justifyItems: "inherit" }}
              >
                <div>
                  <SearchButton />
                </div>
                <div className="ml-2 m-b-2 mt-1">
                  <p
                    className="pt-1"
                    style={{
                      fontWeight: "bold",
                      color: "#2b78a2",
                      fontSize: "small",
                    }}
                  >
                    Search with filter
                  </p>
                </div>
              </div>
            </div>
            <Divider light />
            <ListGroup>
              {friends.map((friend, index) => (
                <ListGroupItem
                  key={index}
                  style={{ borderLeft: "none", borderRight: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        <Avatar
                          src={friend.profileLink}
                          alt="Remy Sharp"
                          width="100%"
                          style={{ objectFit: "contain" }}
                          className={classes.large}
                        />
                      </div>
                      <div className="p-2">
                        <ListGroupItemHeading
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          {friend.friendName}
                        </ListGroupItemHeading>
                        <ListGroupItemText
                          style={{ fontSize: "14px", color: "grey" }}
                        >
                          Engineer at Sundarban Industrial Complex Limited(
                          Bashundhara Group)
                          <p style={{ fontSize: "12px", color: "grey" }}>
                            Connected 4 hours ago
                          </p>
                        </ListGroupItemText>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <ChatModal
                          onMouseOver={(e) => setReadInfo(e.target.value)}
                          name={friend.friendName}
                          proPic={friend.profileLink}
                        />

                        {/* -------------------------------Modal-------------- */}

                        {/* ------------------Modal-------------- -----------------*/}
                      </div>
                      <div>
                        <MoreHorizIcon className="ml-3" />
                      </div>
                    </div>
                  </div>
                  <Divider light />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MyConnection;
