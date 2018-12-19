import React, { Component } from 'react'
import axios from 'axios'
import classes from './Detail.css'
class Detail extends Component {
  state = {
    movie: null,
    loading: true,
    showMenu: true,
    errors: false,
    favs:[]
  }
  /**
   * handler to manage menu show
   */
  menuHandler = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }
  addToFav = (path, name, id) => {
    let mov = {
      path,
      name,
      id
    }
    // todo; validate if exists
    if (localStorage.getItem('favs') === null ) {
      let favs = []
      favs.push(mov)
      this.setState({ favs: favs })
      localStorage.setItem('favs', JSON.stringify(favs))
    } else {
      let exFavs = JSON.parse(localStorage.getItem('favs')) 
      exFavs.push(mov)
      this.setState({favs: exFavs})
      localStorage.setItem('favs', JSON.stringify(exFavs))
    }
  }
  componentDidMount() {
    let movieId = this.props.match.params.movieId
    /**
     * get a specific movie by param
     */
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=9124fe005d007e543def06ff8917205d&language=en-US&page=1`
      )
      .then(response => {
        console.log(response)
        this.setState({ movie: response.data, loading: false })
      })
      .catch(error => {
        this.setState({ error: true })
      })
    /**
     * get data from local storage if dont have objects
     */
    if (localStorage.getItem('favs') !== null ) {
      let exFavs = JSON.parse(localStorage.getItem('favs'))
      this.setState({ favs: exFavs })
    }
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
      let favs = null
      if (localStorage.getItem('favs') !== null) {
        favs = this.state.favs.map(fav => <div className="fav">
            <img className="fav__img" src={`https://image.tmdb.org/t/p/w500/${fav.path}`} alt="" />
            <div className="fav__detail">
              <strong>{fav.name}</strong>
            </div>
          </div>)
      }
      movie = <div className="movie_container">
          <div className={`menu ${showMenu}`}>
            <div className="menu__tag" onClick={this.menuHandler}>
            </div>
            <div className="menu__favlist">
              {favs}
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
              <button
                onClick={() =>
                  this.addToFav(
                    this.state.movie.poster_path,
                    title,
                    this.props.match.params.movieId
                  )
                }
              >
                Add to favorites
              </button>
            </div>
          </div>
        </div>
    }
    return <div>{movie}</div>
  }
}

export default Detail