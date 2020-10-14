import React from "react";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import TimeAgo from "timeago-react";
import { CircularProgress } from "@material-ui/core";

/**
 *
 * @param {json} props
 * json contains siteId,BlogId,content,excerpt,thumbnail,title,time of the blogs
 * We will diplay all of it inside a Card
 * onClink of the Tag using <Link> we will redirect them to Blogpage by passing Title,siteId,BlogId,content to the BlogPage which will render all these data
 */

function Card(props) {
  console.log("data", props);

  if (props.stringVal.content !== null) {
    return (
      <div className="card">
        {/* By clicking on any item inside <Link> tag will redirect to BlogPage with props passed in aboutprops */}
        <Link
          to={{
            pathname: "/Blogpage",
            aboutprops: {
              name: `${props.stringVal.content}`.toString(),
              siteId: `${props.stringVal.siteId}`,
              id: `${props.stringVal.id}`,
              title: `${props.stringVal.title}`,
            },
          }}
          style={{
            textDecoration: "none", //to not highlight the tags inside Link tag
          }}
        >
          <h3>{props.stringVal.title}</h3>
          <img
            src={props.stringVal.thumbnail}
            alt="unable to load"
            style={{ width: "300px", height: "100px" }}
          />
          {/* execerpt contains html tags within it so we will convert it into string and using re-exp will remove all tags and extract just text out of it */}
          <p>{props.stringVal.excerpt.toString().replace(/<[^>]+>/g, "")}</p>
          {/* TimeAgo is a 3rd paty library used to convert the default format of time into time-period ago */}
          <TimeAgo datetime={props.stringVal.time} locale="en_US.ts" />
        </Link>
      </div>
    );
  }
}

export default Card;
