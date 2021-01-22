import React, { useState, useEffect } from "react";
import { useHistory, useParams  } from "react-router-dom";
import axios from "axios";


const initialState = {
  title: '',
  director: '',
  metascore: '',
};

export const UpdateMovie = (props) => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialState);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res.data);
      setMovie(res.data);
    })
    .catch(err => console.log(err))
  }, [id]);

  const changeHandler = e => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;
    console.log(value);
    setMovie({
      ...movie, 
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
    .then(res => {
      console.log(res);
      push('/');
      props.setMovieList([...props.MovieList, res.data])
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
     <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />

      <button>Update</button>
        </form>
    </div>
  )
}
export default UpdateMovie;