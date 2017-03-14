import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../actions';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const name = this.state.text;
    if (name.includes('/')) {
      this.setState({ error: 'Invalid character: /', name: '' });
    } else if (this.props.lists.find(list => list.name === name)) {
      this.setState({ error: 'List already exists.', name: '' });
    } else {
      const path = `/${this.props.list}`;
      this.props.dispatch(actions.editList(path, this.state.text));
      this.setState({ text: '' });
      this.props.dispatch(actions.setPage('home'));
    }
  }

  onDelete() {
    console.log('delete');
    const path = `/${this.props.list}`;
    this.props.dispatch(actions.deleteList(path));
    this.props.dispatch(actions.setPage('home'));
  }

  renderButton() {
    if (this.state.loading) {
      return <div className="spinner" />;
    }
    return <button className="standalone-btn" type="submit">Login/Signup</button>;
  }

  render() {
    return (
      <main>
        <div>
          <h2>Editing {this.props.listName}</h2>
          <button className="right" onClick={() => this.props.dispatch(actions.setPage('home'))}>
            Return to list
          </button>
        </div>
          <h3>Change Title</h3>
        <form className="search" onSubmit={(e) => this.onSubmit(e)}>
          <input
            type="text"
            placeholder="Enter new title"
            value={this.state.text}
            onChange={(e) => this.onChange(e)}
          />
          <button type="submit">Submit</button>
        </form>
        <h3>Delete List</h3>
        <button className="standalone-btn" onClick={this.onDelete.bind(this)}>Delete</button>
      </main>
    );
  }
}

const mapStateToProps = ({ listName, list }) => {
  return { listName, list };
};

export default connect(mapStateToProps)(Edit);