import React, {Component} from 'react'
import axios from 'axios'
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
    return (
      <div>
        <h1>Popular movies</h1>
        {
          this.state.movies.map(movie => <h1>hello</h1>)
      }
      </div>
    )
  }
}

export default MoviesList