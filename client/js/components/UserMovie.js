import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class UserMovie extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.addSeasons = this.addSeasons.bind(this);
    this.addEpisodes = this.addEpisodes.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onClick() {
    const path = `/${this.props.list}/shows/${this.props.id}`;
    this.props.dispatch(actions.deleteMovie(path));
  }

  onCheck() {
    const path = `/${this.props.list}/${this.props.id}`;
    let watched;
    if (this.props.watched == true) {
      watched = false;
    } else {
      watched = true;
    }
    this.props.dispatch(actions.markWatched(path, { watched }));
  }

  addSeasons() {
    const path = `/${this.props.list}/${this.props.id}`;
    this.props.dispatch(actions.getSeasons(path));
    this.props.dispatch(actions.markWatched(path, { watched: true }));
  }

  addEpisodes() {
    this.props.dispatch(actions.getEpisodes(this.props));
    const path = `/${this.props.list}/${this.props.id}`;
    this.props.dispatch(actions.markWatched(path, { watched: true }));
  }

  renderWatched() {
    if (this.props.watched == true) {
      return <button className="drop" onClick={this.onCheck}>MARK AS UNWATCHED</button>;
    }
      return <button className="drop" onClick={this.onCheck}>MARK AS WATCHED</button>;
  }

  renderButtons() {
    const watched = this.renderWatched();
    const deleteButton = (this.props.owner) ? <button className="drop" onClick={this.onClick}>DELETE</button> : null;
      switch (this.props.media_type) {
        case 'movie':
          return (<div className="card-actions">
            <button className="options">OPTIONS</button>
            {deleteButton}
            {watched}
          </div>);
        case 'tv':
          return (<div className="card-actions">
            <button className="options">OPTIONS</button>
            {deleteButton}
            <button className="drop" onClick={this.addSeasons}>SHOW SEASONS</button>
            {watched}
          </div>);
        case 'season':
          return (<div className="card-actions">
            <button className="options">OPTIONS</button>
            {deleteButton}
            <button className="drop" onClick={this.addEpisodes}>SHOW EPISODES</button>
            {watched}
          </div>);
        case 'episode':
          return (<div className="card-actions">
            <button className="options">OPTIONS</button>
            {deleteButton}
            {watched}
          </div>);
        default:
          return (<div className="card-actions">
            <button className="options">OPTIONS</button>
            {deleteButton}
            {watched}
          </div>);
      }
  }

  render() {
    if (this.props.media_type === 'season' && (this.props.number === 0 || !this.props.number)) {
      return null;
    }
    const title = this.props.title;
    let img = (<img src={`https://image.tmdb.org/t/p/w92${this.props.poster_path}`} alt='poster' />);
    let details = '';
    if (this.props.media_type === 'season' && this.props.number) {
      details = `Season ${this.props.number}`;
    }
    if (this.props.media_type === 'episode') {
      details = `Episode ${this.props.number}: ${this.props.episode}`;
      img = (<img src={`https://image.tmdb.org/t/p/w185${this.props.poster_path}`} alt='poster' />);
    }
    if (!this.props.poster_path) {
      img = (<div className="no-image" />);
    }
    const classes = (this.props.watched == true) ? `${this.props.media_type} watched` : this.props.media_type;
    return (
      <li id={this.props.id} className={classes}>
        <div className="circle" />
        {img}
        <h2>{title}</h2>
        <p>{details}</p>
        <p>{this.props.release_date}</p>
        {this.renderButtons()}
      </li>
  );
  }
}

const mapStateToProps = (state) => ({
  list: state.list,
  userMovies: state.userMovies
});

export default connect(mapStateToProps)(UserMovie);
