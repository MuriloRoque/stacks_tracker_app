import React, { useCallback } from "react";
import axios from 'axios';
import { updateData, login } from '../../actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Registration = ({ user, updateData, login }) => {

  const history = useHistory();

  const updateDataChange = useCallback(event => {
    updateData(event.target.name, event.target.value);
  }, [updateData]);

  const successfulAuth = () => {
    login()
    history.push('/')
  }

  const handleSubmit = (e) => {
    axios.post('http://localhost:3000/registrations', { user: user },
    { withCredentials: true }).then(response => {
      if (response.data.status === 'created'){
        successfulAuth();
      }
    }).catch(error => {
      updateData('registrationErrors', error.response.statusText);
    })
    e.preventDefault();
  }

  return(
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
                type="email"
                name="email"
                id="userEmail"
                placeholder='E-mail'
                className="form-control"
                autoComplete="email"
                required
                onChange={updateDataChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPassword">Password</label>
              <input
                type="password"
                name="password"
                id="userPassword"
                placeholder='Password'
                className="form-control"
                autoComplete="new-password"
                required
                onChange={updateDataChange}
              />
              <small className="form-text text-muted">
                At least 6 characters
              </small>
            </div>
              <div className="form-group">
                <label htmlFor="userPasswordConfirmation">Confirm password</label>
                <input
                  type="password"
                  name="userPasswordConfirmation"
                  id="userPasswordConfirmation"
                  placeholder='Password confirmation'
                  className="form-control"
                  autoComplete="new-password"
                  required
                  onChange={updateDataChange}
                />
                <small className="form-text text-muted">
                  At least 6 characters
                </small>
              </div>
            <div>
              <h4>{user.registrationErrors}</h4>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Registration.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
    registrationErrors: PropTypes.string.isRequired,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);