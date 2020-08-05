import React, { useCallback } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { updateData, login } from '../../actions/index';

const Registration = ({ user, updateData, login }) => {
  const history = useHistory();

  const updateDataChange = useCallback(e => {
    updateData(e.target.name, e.target.value);
  }, [updateData]);

  const successfulAuth = id => {
    login();
    updateData('userId', id);
    history.push('/');
  };

  const handleSubmit = e => {
    axios.post('https://murilo-stacks-tracker.herokuapp.com/registrations', { user },
      { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        successfulAuth(response.data.user.id);
      }
    }).catch(error => {
      updateData('registrationErrors', error.response.statusText);
    });
    e.preventDefault();
  };

  return (
    <div className="d-flex flex-column justify-content-around align-items-center login-page">
      <div className="row">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userEmail">
                Email
                <input
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="E-mail"
                  className="form-control"
                  autoComplete="email"
                  required
                  onChange={updateDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="userPassword">
                Password
                <input
                  type="password"
                  name="password"
                  id="userPassword"
                  placeholder="Password"
                  className="form-control"
                  autoComplete="new-password"
                  required
                  onChange={updateDataChange}
                />
              </label>
              <small className="form-text text-muted">
                At least 6 characters
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="userPasswordConfirmation">
                Confirm password
                <input
                  type="password"
                  name="userPasswordConfirmation"
                  id="userPasswordConfirmation"
                  placeholder="Password confirmation"
                  className="form-control"
                  autoComplete="new-password"
                  required
                  onChange={updateDataChange}
                />
              </label>
              <small className="form-text text-muted">
                At least 6 characters
              </small>
            </div>
            <div>
              <h4 className="red-error">{user.registrationErrors}</h4>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Registration.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
    registrationErrors: PropTypes.string.isRequired,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
