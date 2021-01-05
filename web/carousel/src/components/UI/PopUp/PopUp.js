import React from "react";
import classes from "./PopUp.module.css";

const PopUp = (props) => {
  return (
    <div className={classes.PopUp} centered>
      <div style={{color:"white", margin:"auto"}}>
        Delete "{props.title}"?
      </div>
      <div className={classes.PopUpButtons}>
        <button style={{marginLeft:"60px"}} onClick={props.clickYes}>{props.buttonYes}</button>
        <button style={{marginRight:"60px"}} onClick={props.clickNo}>{props.buttonNo}</button>
      </div>
    </div>
  );
}

export default PopUp;