import React from "react";
import "../App.scss";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Photo from "../image/mockup-phone.png";

function HomePage(props) {
  return (
    <>
      <div className="home-section">
        <div className="hero">
          <div className="hero-header">
            <h1>Use bill tracker to see bills and money in one place</h1>
          </div>
          <div className="hero-text">
            <p>You can see all your finances at a glance</p>
          </div>
          <div className="home-action">
            {props.name && <Button>{props.name}</Button>}
            <Link to="/create" className="ui button">
              Create Bills /create
            </Link>
            <Link to="/track" className="ui button">
              Track Bill
            </Link>
            <Link to="/signup" className="ui button">
              Create User
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={Photo} alt="phone with chart" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
