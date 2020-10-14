import React from 'react';
import { CircularProgress } from "@material-ui/core";

/**
 * 
 * @param {String} props 
 * It taked the value from props and display as li element
 */

function LiElement(props) {
   return (
   <li>{props.stringVal}</li>
   )
}

export default LiElement;