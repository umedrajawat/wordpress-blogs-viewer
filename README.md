Truecaller Technical Assignment




Commands
Command to run the server on port 5000
>>node index


Command to start the React client on port 3000
>>npm start

SCREENS

HOME PAGE - 
consists of a button onClick of which call /Fetchblogs api that will fetch all bloags associated with the site and return it to client



When we click on LOOK AT ALL BLOGS OF TRUECALLER
2 things will happen:
 1. Loading screen:Loading symbol will be shown
 2. List of Blogs: Blogs along with thumbnail,time,ecerpt will be displayed in form of card. For each blog a card will be shown on the screen
  

BLOG PAGE
OnClick of any of the cards we will be redirected to that particular Blogs Page which will contain following:
1. Content
2. List of tags
3. List of  Categories
4. Related posts in form of cards

Onclick of any of the cards in THE RELATED POSTS section will render the contents, tags, categories of that page in BlogPage 


Explanation of the Solution

Server:

Created a server using express exposing following endpoints-
http://localhost:5000/fetchblogs [METHOD-GET ]
http://localhost:5000/tags[METHOD-POST ]
http://localhost:5000/categories[METHOD-POST ]
http://localhost:5000/fetchRelatedPosts[METHOD-POST ]


/fetchblogs-
It calls https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/
to get list of all blogs associated with this site along with their title, contents,time,thumbnails,siteId,BlogId and send it as a response in form of an array of jsons to the client


/tags-
It calls https://public-api.wordpress.com/rest/v1.1/sites/${req.body.siteId}/tags
To get list of all tags associated to a particular blog and push it into an array and return the array as a response to the client


/categories-
It calls https://public-api.wordpress.com/rest/v1.1/sites/${req.body.siteId}/categories
To get a list of all categories associated with a blog and push it into an array and return it to the client as a response.


/fetchRelatedPosts-
It calls https://public-api.wordpress.com/rest/v1/sites/${req.body.siteId}/posts/${req.body.id}/related?http_envelope=true
To get the ids of related post and with the help of the id we will call 
https://public-api.wordpress.com/rest/v1.1/sites/${id}/posts/${element.fields.post_id}
To get content,id,thumbnail,time,title associated with the blog and create a json for each related blog with these attributes and push it into an array and return this array of json as a response to the client.




Client:
I have used react to build the frontend.
3rd party libraries used-
1. Axios
2. TimeAgo- to display time in min,secs,hours,days,week,months ago format
3. CircularProgress- to display loading screen
4. Html-react-parser-to parse string containing html+text to  text 


Used Link of react-router-dom to route to Blogposts.js with the relevant props onClick of the cards.


Used Route to define Route for BlogPosts.js


Rest all comments have been added in the files that will explain the rendering and reusing of components.


Reusable Components:
1. BlogPost.js
2. Cards.js
3. Card.js
4. Lielment.js
