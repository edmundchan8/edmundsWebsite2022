import React, {useState, useEffect} from "react"
import axios from 'axios'

const IndexPage = () => {
  const BASEURL = "http://127.0.0.1:8000/api/";
  const [authors, setAuthors] = useState([]);
  
  useEffect(() => {
    //when applicaton loads, async this method to get all authors from laravel api and return the data
    async function getAllAuthors(){
      try {
        const authors = await axios.get(BASEURL + 'authors');
        setAuthors(authors.data);
      }
      catch (error){
        console.log(error);
      }
    }
    //call this method once the api call is complete
    getAllAuthors();
  }, []);

  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e) => {
    axios.post(BASEURL + 'authors', {author: author, description: description})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
      //if there is an error, we can view the response.data of the error
      console.log(error.response.data);
    })
  }

  return (
  <div>
    My Gatsby Page
    {
      //filter through authors data and output each author
      authors.map((data, i) => {
        return (
        <h4 key={i}>
          {data.author}
          <br/>
          {data.description}
        </h4>)
      })
    }

    {/* form - calls handleSubmit function when form submitted*/}
    <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input
            name="author"
            type="text"
            value={author}
            // Each time a change is made to this input, set the author state
            onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <br />
        <label>
          Description
          <input
            name="description"
            type="text"
            value={description}
            // Each time a change is made to this input, set the description state
            onChange={(e) => setDescription(e.target.value)} />
        </label>
        <input type="submit" value="Add Author"/>
      </form>
  </div>
  )
}

export default IndexPage
