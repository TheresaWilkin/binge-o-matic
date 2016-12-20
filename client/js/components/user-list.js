import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UserMovie from './user-movie';

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('did mount');
    this.props.dispatch(actions.fetchMovies());
  }

  render() {
    const movies = this.props.userMovies.sort((x, y) => y.release_date < x.release_date).map((movie, index) => (
         <UserMovie key={index} id={movie.id} img={movie.poster_path} title={movie.title} date={movie.release_date} />
    ));

    return (
      <div className="userList">
      <h2>Your List</h2>
      <ul>
        {movies}
      </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userMovies: state.userMovies
});

export default connect(mapStateToProps)(UserList);
