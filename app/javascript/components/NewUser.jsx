import React, {useState} from "react";
import { connect } from 'react-redux';
import { signup } from '../actions/index';

const NewUser = ({user, signup}) => {

  const [user, setUser] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(user)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new user:
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userEmail">Email</label>
              <input
                type="text"
                name="email"
                id="userEmail"
                className="form-control"
                autoComplete="email"
                required
                onChange={e => setUser({
                  ...user,
                  email: e.target.value
                })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPassword">Password</label>
              <input
                type="password"
                name="password"
                id="userPassword"
                className="form-control"
                autoComplete="new-password"
                required
                onChange={e => setUser({
                  ...user,
                  password: e.target.value
                })}
              />
              <small className="form-text text-muted">
                At least 6 characters
              </small>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
});

const mapStateToProps = (state) => {
  return ({
    user: state.currentUser,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
