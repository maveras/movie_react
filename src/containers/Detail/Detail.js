import React, { Component } from 'react'
import axios from 'axios'
import classes from './Detail.css'
class Detail extends Component {
  state = {
    movie: null,
    loading: true,
    showMenu: false,
    errors:false
  }
  menuHandler = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }
  componentDidMount() {
    let movieId = this.props.match.params.movieId
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9124fe005d007e543def06ff8917205d&language=en-US&page=1`)
      .then(response => {
        console.log(response)
        this.setState({ movie: response.data, loading: false })
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }
  render() {
    let movie = null
    let showMenu = this.state.showMenu ? '' : 'menu--show'
    if (this.state.movie) {
      let generes = this.state.movie.genres.map(genre => (
        <div className="movie-gender">{genre.name}</div>
      ))
      let overview = this.state.movie.overview
      let rating = this.state.movie.vote_average
      let title = this.state.movie.title
      movie = <div className="movie_container">
          <div className={`menu ${showMenu}`}>
            <div className="menu__tag">X</div>
            <div className="menu__favlist">
              <li> peli 1</li>
              <li> peli 1</li>
              <li> peli 1</li>
            </div>
          </div>
          <div>
            <img className="img-main " src={`https://image.tmdb.org/t/p/w500/${this.state.movie.backdrop_path}`} />
          </div>
          <div className="movie_detail">
            <div className="movie-detail__cover">
              <img src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} />
            </div>
            <div className="main_detail">
              <div className="movie__title">
                <h3>{title}</h3>
              </div>
              <div className="movie__genres">{generes}</div>
              <div className="movie__review">
                <span>{overview}</span>
              </div>
              <div className="movie_eval">
                <div className="movie_eval__rating">
                  <span>Rating: {rating}</span>
                </div>
              </div>
              <button onClick={this.menuHandler}>Add to favorites</button>
            </div>
          </div>
        </div>
    }
    return (
      <div>
        {movie}
      </div>
    )
  }
}

export default Detail