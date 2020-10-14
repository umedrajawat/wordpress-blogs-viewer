import React from "react";
import Card from "./Card";


/**
 *
 * @param {Array} props
 * props is an array of jsons in which each json contains title,content,excerpt.thumbnail,time of the blog
 * We will map over the array and for each element we will render a Card Component
 *
 */

function Cards(props) {
  return (
    <div id="cards-container">
      {props.data.map((value, index) => {
        console.log("value", value);
        return <Card stringVal={value} />;
      })}
    </div>
  );
}

export default Cards;
