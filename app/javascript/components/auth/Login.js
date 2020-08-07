import React, { useCallback } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { updateData, login } from '../../actions/index';

const Login = ({ user, updateData, login }) => {
  const history = useHistory();

  const updateDataChange = useCallback(event => {
    updateData(event.target.name, event.target.value);
  }, [updateData]);

  const successfulAuth = id => {
    login();
    updateData('userId', id);
    history.push('/');
  };

  const handleSubmit = e => {
    axios.post('http://localhost:3000/api/v1/sessions', { user },
      { withCredentials: true }).then(response => {
      if (response.data.logged_in) {
        successfulAuth(response.data.user.id);
      }
      else {
        updateData('loginErrors', 'Wrong e-mail or password');
      }
    })
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
            <div>
              <h4 className="red-error">{user.loginErrors}</h4>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loginErrors: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
