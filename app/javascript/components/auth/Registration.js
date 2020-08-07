import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { updateData, submitSignup } from '../../actions/index';

const Registration = ({ user, updateData, submitSignup }) => {
  const history = useHistory();

  const updateDataChange = useCallback(e => {
    updateData(e.target.name, e.target.value);
  }, [updateData]);

  const handleSubmit = e => {
    e.preventDefault();
    submitSignup(history, user);
  };

  return (
    <div className="d-flex flex-column justify-content-around align-items-center login-page">
      <div className="row">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  className="form-control"
                  autoComplete="email"
                  required
                  onChange={updateDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
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
              <label htmlFor="passwordConfirmation">
                Confirm password
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
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
  submitSignup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  submitSignup: (history, user) => dispatch(submitSignup(history, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
