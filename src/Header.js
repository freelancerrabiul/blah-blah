import { auth } from "./firebase";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Header.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Header = (props) => {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const email = user?.email;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="feed">
      <div className="feed__header fixed-top">
        <Navbar className="bg-custom" light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  className="nav-link font-weight-bold text-dark"
                >
                  Options
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem header> {email} </DropdownItem>
                  <Link className="text-decoration-none">
                    <DropdownItem>View Profile</DropdownItem>
                  </Link>

                  <Link className="text-decoration-none" to="/profile_info">
                    <DropdownItem>Update Profile</DropdownItem>
                  </Link>

                  <DropdownItem divider />
                  <DropdownItem>Setting</DropdownItem>
                  <DropdownItem>Language</DropdownItem>
                  {user ? (
                    <DropdownItem onClick={() => auth.signOut()}>
                      Log out
                    </DropdownItem>
                  ) : (
                    history.push("/")
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <Link
                  className="nav-link font-weight-bold text-dark"
                  to="/feed"
                >
                  Home
                </Link>
              </NavItem>
              <Link
                className="nav-link font-weight-bold text-dark"
                to="/mynetwork"
              >
                My network
              </Link>

              <NavItem>
                <Link
                  className="nav-link font-weight-bold text-dark"
                  to="/messaging"
                >
                  Messaging
                </Link>
              </NavItem>

              <NavItem>
                <Link
                  className="nav-link font-weight-bold text-dark"
                  to="/notification"
                >
                  Notifiations
                </Link>
              </NavItem>

              <NavItem>
                <Link
                  className="nav-link font-weight-bold text-dark"
                  to="/explore"
                >
                  Explore
                </Link>
              </NavItem>

              <NavItem>
                <form class="form-inline">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    class="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
