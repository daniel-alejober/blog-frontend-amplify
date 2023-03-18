import React, { useState } from "react";
import { Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../request/account";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userSlice";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const logOutAccount = async () => {
    try {
      const data = await logout();
      if (data.success) {
        dispatch(logOut());
        handleLinkClick();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stlylesBtn = (color) => {
    return {
      backgroundColor: color,
      padding: "10px 20px",
      borderRadius: "15px",
      fontSize: "15px",
      textAlign: "center",
      textDecoration: "none",
      color: "#ffffff",
      letterSpacing: "1px",
      border: "none",
      margin: "3px 0",
      cursor: "pointer",
    };
  };

  return (
    <Navbar
      style={{
        backgroundColor: "rgb(31, 41, 55)",
        borderBottom: "1px solid rgb(36, 42, 56)",
      }}
      fluid={true}
      rounded={true}
    >
      <Link to="/" onClick={handleLinkClick}>
        <span className="self-center whitespace-nowrap text-2xl font-bold text-white">
          {user?.username ? `Blog ${user?.username}` : "Blog"}
        </span>
      </Link>

      <Navbar.Toggle onClick={handleMenuToggle} />

      <Navbar.Collapse
        className={isOpen ? "navbarCollapseShow" : "navbarCollapseNone"}
      >
        {user?.userId ? (
          <>
            <Navbar.Link
              as={Link}
              to="/newarticle"
              style={stlylesBtn("#3498db")}
              onClick={handleLinkClick}
            >
              New Article
            </Navbar.Link>
            <Navbar.Link style={stlylesBtn("#db3434")} onClick={logOutAccount}>
              LogOut
            </Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Link
              as={Link}
              to="/signin"
              style={stlylesBtn("#3498db")}
              onClick={handleLinkClick}
            >
              Signin
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/signup"
              style={stlylesBtn("#34db58")}
              onClick={handleLinkClick}
            >
              Signup
            </Navbar.Link>{" "}
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
