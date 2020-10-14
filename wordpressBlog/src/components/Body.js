import React from "react";
import Cards from "./Cards";
import axios from "axios";
import "../styles/styles.css";
import { CircularProgress } from "@material-ui/core";

/**
 *
 * @param {*} props
 * The body will render a button until the button is clicked.
 * Once button is clicked it will state of the page to true and will call localhost to fetchBlogs related to Truecaller
 * and render multiple Cards.
 *
 */

function Body(props) {
  //state to check if user has clicked on button to see blogs or not
  const [page, setPage] = React.useState(false);
  //to store response from the api when the button is clicked
  const [data, setData] = React.useState("");
  //fired on button OnClick event
  const display_all_blogs = () => {
    setPage(true);
    //axios get call
    axios.get("http://localhost:5000/fetchblogs").then((res) => {
      console.log("response", res);
      setData(res.data);
    });
  };
  if (page === false) {
    return (
      <div classame="home">
        <button className="button" onClick={display_all_blogs}>
          Look at all Blogs of TrueCaller
        </button>
      </div>
    );
  } else {
    //if response is till not received show a loading screen
    if (data === "") {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    } else if (Array.isArray(data)) {
      //passing data as props to child component
      return (
        <div id="card-super-container">
          <Cards data={data} />
        </div>
      );
    } else if (data !== null) {
      return (
        <div id="card-super-container">
          <Cards data={data} />
        </div>
      );
    }
  }
}

export default Body;
