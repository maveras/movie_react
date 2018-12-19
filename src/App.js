import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import MoviesList from './containers/MoviesList/MoviesList.js'
import Detail from './containers/Detail/Detail.js'

import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/detail/:movieId" component={Detail} />
          <Route path="/"  component={MoviesList} />
        </Switch>
      </div>
    )
  }
}

export default App
