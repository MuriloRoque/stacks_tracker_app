import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { submitLogin, updateData } from '../../actions/index';

const Login = ({ user, updateData, submitLogin }) => {
  const history = useHistory();

  const updateDataChange = useCallback(e => {
    updateData(e.target.name, e.target.value);
  }, [updateData]);

  const handleSubmit = e => {
    e.preventDefault();
    submitLogin(history, user);
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
  submitLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  submitLogin: (history, user) => dispatch(submitLogin(history, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
