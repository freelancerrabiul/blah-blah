import React, { useState } from "react";
import  { Link } from "react-router-dom";

import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,  
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  
} from "reactstrap";

const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="feed">
      <div className="feed__header fixed-top bg-primary">
        <Nav
          tabs
          style={{
            background: "rgb(40, 62, 75, 1)",
            padding: "5px",
            fontSize:"medium"
          }}
        >
          <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav caret>
             My Profile
            </DropdownToggle>
            <DropdownMenu>

               <DropdownItem header>Md Rabiul</DropdownItem> 
             
               <Link className="text-decoration-none"><DropdownItem>View Profile</DropdownItem></Link>
               <Link className="text-decoration-none" to="/profile_info"><DropdownItem>Update Profile</DropdownItem></Link>
            
              <DropdownItem divider />             
              <DropdownItem>Setting</DropdownItem>
              <DropdownItem>Language</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <Link className="nav-link" style={{ color: "white" }} to="/feed">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" style={{ color: "white" }} to="/mynetwork">
              My network
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" style={{ color: "white" }} to="/messaging">
              Messaging
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" style={{ color: "white" }} to="/notification">
              Notifiations
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" style={{ color: "white" }} to="/explore">
              Explore
            </Link>
          </NavItem>

          <NavItem> 
              <InputGroup >
                <Input style={{backgroundColor:"#e1e8ee",marginLeft:"15px", paddingLeft:"45px"}} placeholder="type..." />
                <InputGroupAddon addonType="append">
                  <Button color="primary">Search</Button>
                </InputGroupAddon>
              </InputGroup>  
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Header;
