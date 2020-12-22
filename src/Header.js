import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Home from "@material-ui/icons/Home";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Header(props) {
  // -------------------------For Notify Items*START*--------------
  const history = useHistory();
  const [{ user }] = useStateValue();
  const mainUser = user?.email;
  const [length, setLength] = useState([]);

  useEffect(() => {
    if (mainUser) {
      db.collection("users")
        .doc(mainUser)
        .collection("pending_connections")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setLength(snapshot.docs.map((doc) => doc.data()));
        });
    } else {
      console.log("useEffect from header.js--->120");
    }
  }, [mainUser]);
  // -------------------------For Notify Items*ENDS*--------------
  const handleClick = (e) => {
    e.preventDefault();
    setLength("");
  };

  // -------------------------Function For Srollbatoon to return top**--------------
  function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }

  // -------------------------Function For Srollbatoon to return top**--------------

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem> {mainUser} </MenuItem>

      <Link
        style={{ color: "black" }}
        className="text-decoration-none"
        to="/profile_info"
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>

      <Link
        style={{ color: "black" }}
        to="/view_profile"
        className="text-decoration-none"
      >
        <MenuItem>View Profile</MenuItem>
      </Link>

      {mainUser ? (
        <MenuItem style={{ color: "black" }} onClick={() => auth.signOut()}>
          Log out
        </MenuItem>
      ) : (
        history.push("/")
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={props.alertCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        style={{
          background: "linear-gradient(-45deg, #FE6B8B 30%, #FF8E53 80%)",
        }}
      >
        <Toolbar>
          <IconButton
            style={{ outlineStyle: "none" }}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <ExpandMoreIcon style={{ fontSize: "medium" }} />
          {/* ---------------------desktop--------------------------------- */}
          <div className={classes.sectionDesktop}>
            <Grid container spacing={6}>
              <Grid className="header_grid" item xs={1}></Grid>

              <Grid item xs={2}>
                <Button style={{ outlineStyle: "none" }}>
                  <Link to="/feed">
                    <div
                      className="text-light"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div className="header_icons">
                        <Home style={{ marginBottom: "-10px" }} />
                      </div>
                      <div>
                        <small style={{ fontSize: "10px" }}>Home </small>
                      </div>
                    </div>
                  </Link>
                </Button>
              </Grid>

              <Grid item xs={2}>
                <Button style={{ outlineStyle: "none" }}>
                  <Link to="/connection">
                    <div
                      className="text-light"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div className="header_icons">
                        <SettingsInputComponentIcon
                          style={{ marginBottom: "-10px" }}
                        />
                      </div>
                      <div>
                        <small style={{ fontSize: "10px" }}>Connection </small>
                      </div>
                    </div>
                  </Link>
                </Button>
              </Grid>

              <Grid item xs={2}>
                <Button onClick={handleClick} style={{ outlineStyle: "none" }}>
                  <Link to="/notification">
                    <div
                      className="text-light"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div className="header_icons">
                        <Badge badgeContent={length.length} color="secondary">
                          <NotificationsIcon
                            style={{ marginBottom: "-10px" }}
                          />
                        </Badge>
                      </div>
                      <div>
                        <small style={{ fontSize: "10px" }}>
                          Notification{" "}
                        </small>
                      </div>
                    </div>
                  </Link>
                </Button>
              </Grid>

              <Grid item xs={2}>
                <Button style={{ outlineStyle: "none" }}>
                  <Link to="/messages">
                    <div
                      className="text-light"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div>
                        <Badge badgeContent={4} color="secondary">
                          <MailIcon style={{ marginBottom: "-10px" }} />
                        </Badge>
                      </div>
                      <div>
                        <small style={{ fontSize: "10px" }}> Messages </small>
                      </div>
                    </div>
                  </Link>
                </Button>
              </Grid>

              <Grid item xs={2}>
                <Button style={{ outlineStyle: "none" }}>
                  <Link to="/explore">
                    <div
                      className="text-light"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div>
                        <EmojiPeopleIcon style={{ marginBottom: "-10px" }} />
                      </div>
                      <div>
                        <small style={{ fontSize: "10px" }}> Explore </small>
                      </div>
                    </div>
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </div>
          {/* --------------------------- */}
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {renderMobileMenu}
      {renderMenu}
      <ScrollTop {...props}>
        <Fab className="header__fab" color="secondary" size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}
export default Header;
