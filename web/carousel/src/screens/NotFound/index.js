import React from "react";
import pepe from "../../assets/images/sad-pepe.jpg";

export default function NotFound() {
  return (
    <div className="App" style={{ display: "block" }}>
      <h1>We are sorry that this page is not found!</h1>
      <img src={pepe} alt={"404"} />
      <h3 style={{ marginTop: "40px" }}>
        The dev team is crying because of their irresponsibility...
      </h3>
    </div>
  );
}
