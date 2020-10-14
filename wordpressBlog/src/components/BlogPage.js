import React from "react";
import Parser from "html-react-parser";
import Header from "./Header";
import "../styles/styles.css";
import axios from "axios";
import '../styles/styles.css'
import RelatedtagsAndCategories from "./RelatedtagsAndCategories";
import Cards from "./Cards";

/**
 * 
 * @param {*} props 
 * This is used to display all the contents of the blog along with
 * the Tags,Categories and Posts associated with it
 * 
 */
function BlogPage(props) {

    //ststaes to maintain the details about Posts,Tags and Categories
  const [relatedPosts, setRelatedPosts] = React.useState([]);
  const [relatedTags,setRelatedTags]=React.useState([]);
  const [relatedCategories,setCategories]=React.useState([]);
/**
 * UseEffect will we called as the page renders automatically and will then do a post call
 * to fetchRelatedposts API with a json as param which is sent to server
 * The response received from the Post call is setted as Relatedposts which is an array of Json
 */
React.useEffect(() => {
    console.log("calling related posts");
    axios
      .post("http://localhost:5000/fetchRelatedPosts", {
        siteId: props.location.aboutprops.siteId,
        id: props.location.aboutprops.id,
      })
      .then((res) => {
        console.log("result", res);
        setRelatedPosts(res.data);
      });
  }, []);

  /**
 * UseEffect will we called as the page renders automatically and will then do a post call
 * to tags API with a json as param which is sent to server
 * The response received from the Post call is setted as Tags which is an array of name of Tags
 */
  React.useEffect(() => {
    console.log("calling tags");
    axios
      .post("http://localhost:5000/tags", {
        siteId: props.location.aboutprops.siteId,
        id: props.location.aboutprops.id,
      })
      .then((res) => {
        console.log("result", res);
         setRelatedTags(res.data);
      });
  }, []);


  /**
 * UseEffect will we called as the page renders automatically and will then do a post call
 * to categories API with a json as param which is sent to server
 * The response received from the Post call is setted as Rcategories which is an array of categories name.
 */
  React.useEffect(() => {
    console.log("calling tags");
    axios
      .post("http://localhost:5000/categories", {
        siteId: props.location.aboutprops.siteId,
        id: props.location.aboutprops.id,
      })
      .then((res) => {
        console.log("result", res);
         setCategories(res.data);
      });
  }, []);

  if (props == null) {
    return null;
  } else if (props != null) {
    console.log("data", props.location.aboutprops.name);
    return (
      <div className="blogpage">
        <Header />
        <h1>{props.location.aboutprops.title}</h1>
        <div className="parent">
   
          <div className="content">
            {" "}
            {Parser(props.location.aboutprops.name)}
          </div>
          <div>
            <div className="related_categories">
              <h4><b>CATEGORIES</b></h4>
              <RelatedtagsAndCategories data={relatedCategories}/>
            </div>
            <div>
               <h4><b>TOP 10 TAGS</b></h4>
               <RelatedtagsAndCategories data={relatedTags}/>
            </div>
          </div>
        </div>
        <div className="related-posts">
        <h4>TOP RELATED POSTS</h4>
        <Cards data={relatedPosts}/>
        </div>
      </div>
    );
  }
}

export default BlogPage;
