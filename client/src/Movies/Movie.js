import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useHistory} from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const {push} = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const id = params.id;

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  useEffect (()=>{
    fetchMovie(id)

  },[])

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res);
        props.setMovieList(props.movieList.filter(item=>item.id!==movie.id))
     push("/")
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" onClick={deleteMovie}>
          Delete
        </div>
        <div onClick={() => push(`/update-movie/${params.id}`)}>
          Update
        </div>

    </div>
  );
}

export default Movie;
