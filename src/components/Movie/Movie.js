import React from 'react'
import classes from './Movie.css'

const movie = props => (
  <div className="movie-card">
    <div className="img">
      <img
        src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
        alt=""
      />
      <div className="movie-card__score">{props.vote_average}</div>
    </div>
    <div className="movie-card__detail">
      <div className="movie-card__title">{props.title}</div>
      <div className="movie-card__release-date">{props.release_date}</div>
    </div>
  </div>
)

export default movie;