import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const styles = {
  button1: {
    backgroundColor: "#3498db",
    padding: "10px 20px",
    borderRadius: "28px",
    fontSize: "15px",
    textAlign: "center",
    textDecoration: "none",
    color: "#ffffff",
    letterSpacing: "1px",
    border: "none",
    margin: "3px 0",
  },
  button2: {
    backgroundColor: "#34db58",
    padding: "10px 20px",
    borderRadius: "28px",
    fontSize: "15px",
    textAlign: "center",
    textDecoration: "none",
    color: "#ffffff",
    letterSpacing: "1px",
    border: "none",
    margin: "3px 0",
  },
};

const Header = () => {
  return (
    <Navbar
      style={{
        backgroundColor: "rgb(31, 41, 55)",
        borderBottom: "1px solid rgb(36, 42, 56)",
      }}
      fluid={true}
      rounded={true}
    >
      <Link to="/">
        <span className="self-center whitespace-nowrap text-2xl font-bold text-white">
          Blog
        </span>
      </Link>

      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/signin" style={styles.button1}>
          Signin
        </Navbar.Link>
        <Navbar.Link as={Link} to="/signup" style={styles.button2}>
          Signup
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
