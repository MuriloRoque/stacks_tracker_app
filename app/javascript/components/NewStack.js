import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStack, checkLogin, submitNew } from '../actions/index';
import Footer from '../containers/Footer';

const NewStack = ({
  stack, createStack, loginStatus, user, checkLogin,
}) => {
  const history = useHistory();

  useEffect(() => {
    checkLogin(loginStatus, user, history);
  }, []);

  const createDataChange = useCallback(e => {
    createStack(e.target.name, e.target.value);
  }, [createStack]);

  const handleSubmit = e => {
    e.preventDefault();
    submitNew(history, stack);
  };

  return (
    <div>
      <div className="row mx-0">
        <div className="w-100 px-0">
          <div className="header-title">
            Add stack
          </div>
          <form className="add-stack px-5 pt-5 py-10" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="w-100" htmlFor="stackName">
                Stack name
                <input
                  type="text"
                  name="name"
                  id="stackName"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="stackHours">
                Hours completed
                <input
                  type="number"
                  name="hours"
                  id="stackHours"
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Hours completed"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="stackHoursGoal">
                Hours goal
                <input
                  type="number"
                  name="hoursGoal"
                  id="stackHoursGoal"
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Hours goal"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="stackProjects">
                Projects completed
                <input
                  type="number"
                  name="projects"
                  id="stackProjects"
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Projects completed"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="stackProjectsGoal">
                Projects goal
                <input
                  type="number"
                  name="projectsGoal"
                  id="stackProjectsGoal"
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Projects goal"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div>
              <h4 className="red-error">{stack.createErrors}</h4>
            </div>
            <button type="submit" className="btn mt-3 custom-button">
              Create Stack
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

NewStack.propTypes = {
  stack: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hours: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    hoursGoal: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    projects: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    projectsGoal: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    createErrors: PropTypes.string.isRequired,
  }).isRequired,
  createStack: PropTypes.func.isRequired,
  loginStatus: PropTypes.string.isRequired,
  checkLogin: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
    registrationErrors: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  stack: state.stack,
  loginStatus: state.loginStatus,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createStack: (name, data) => dispatch(createStack(name, data)),
  checkLogin: (loginStatus, user, history) => dispatch(checkLogin(loginStatus, user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewStack);
