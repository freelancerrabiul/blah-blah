import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { CardImg } from "reactstrap";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

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
}));

function MyConnection() {
  const classes = useStyles();

  const [{ user }] = useStateValue();
  const [timestamp, setTimestamp] = useState([]);
  const [friends, setFriends] = useState([]);
  const [paradox, setParadox] = useState("");
  const mainUser = user?.email;

  useEffect(() => {
    if (mainUser) {
      db.collection("users")
        .doc(mainUser)
        .collection("pending_connections")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setFriends(snapshot.docs.map((doc) => doc.data()));
          setTimestamp(snapshot.docs.map((doc) => doc.data().timestamp));
        });
    } else {
      console.log("Cant get the Main user data");
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

  return (
    <div className="container">
      <h6 className="p-4 font-weight-bold text-md-center text-lg-center text-xl-center">
        Drive more leads… Tune in to learn how to drive more leads on Blah Blah
      </h6>

      <Grid container spacing={3}>
        {friends.map(({ id, friend }) => (
          //   <Cards
          //     key={id}
          //     email={people.email}
          //     firstname={people.firstname}
          //     lastname={people.lastname}
          //     about={people.about}
          //     profilePic={people.profilePic}
          //   />

          <Grid item xs={2} md={4} lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardImg
                  className="cards__img"
                  style={{ objectFit: "cover" }}
                  top
                  width="100%"
                  src={profileLink}
                  alt="Loading..."
                />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MyConnection;
