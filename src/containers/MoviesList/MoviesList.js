import React, {Component} from 'react'
import Movie from '../../components/Movie/Movie'
import axios from 'axios'
import classes from './MoviesList.css'
class MoviesList extends Component {
  state = {
    movies: [],
    favorites: [],
    error: false,
    loading: true
  }
  componentDidMount() {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=9124fe005d007e543def06ff8917205d')
      .then(response => {
        console.log(response)
        this.setState({ movies: response.data.results, loading: false })
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }
  render () {
    const movies = this.state.movies.map(movie => (
      <Movie
        title={movie.title}
        vote_average={movie.vote_average}
        release_date={movie.release_date}
        poster_path={movie.poster_path}
        key={movie.key}
      />
    ))
    return <div className="MoviesList">
        <h1>Popular movies</h1>
        <div className="MoviesList-container">
          {movies}
        </div>
      </div>
  }
}

export default MoviesList