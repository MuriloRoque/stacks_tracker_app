import React, { useCallback, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createStack, login, updateData, logout, resetData,
} from '../actions/index';

const NewStack = ({
  stack, createStack, loginStatus, login, updateData, logout, resetData,
}) => {
  const history = useHistory();

  const checkLoginStatus = () => {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loginStatus === 'NOT_LOGGED_IN') {
          login();
          updateData('email', response.data.user.email);
          updateData('userId', response.data.user.id);
          createStack('userId', response.data.user.id);
        } else if (!response.data.logged_in && loginStatus === 'LOGGED_IN') {
          logout();
          resetData();
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const createDataChange = useCallback(e => {
    createStack(e.target.name, e.target.value);
  }, [createStack]);

  const successfulCreate = id => {
    history.push(`/stack/${id}`);
  };

  const handleSubmit = e => {
    axios.post('http://localhost:3000/api/v1/stacks/create', { stack },
      { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        successfulCreate(response.data.stack.id);
      }
    }).catch(error => {
      createStack('createErrors', error.response.statusText);
    });
    e.preventDefault();
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new stack to your collection.
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="stackName">
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
              <label htmlFor="stackHours">
                Hours completed
                <input
                  type="number"
                  name="hours"
                  id="stackHours"
                  defaultValue={0}
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
              <label htmlFor="stackHoursGoal">
                Hours goal
                <input
                  type="number"
                  name="hoursGoal"
                  id="stackHoursGoal"
                  defaultValue={0}
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
              <label htmlFor="stackProjects">
                Projects completed
                <input
                  type="number"
                  name="projects"
                  id="stackProjects"
                  defaultValue={0}
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
              <label htmlFor="stackProjectsGoal">
                Projects goal
                <input
                  type="number"
                  name="projectsGoal"
                  id="stackProjectsGoal"
                  defaultValue={0}
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
              <h4>{stack.createErrors}</h4>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Stack
            </button>
            <Link to="/stacks" className="btn btn-link mt-3">
              Back to stacks
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

NewStack.propTypes = {
  stack: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
    hoursGoal: PropTypes.number.isRequired,
    projects: PropTypes.number.isRequired,
    projectsGoal: PropTypes.number.isRequired,
    createErrors: PropTypes.string.isRequired,
  }).isRequired,
  createStack: PropTypes.func.isRequired,
  loginStatus: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  stack: state.stack,
  loginStatus: state.loginStatus,
});

const mapDispatchToProps = dispatch => ({
  createStack: (name, data) => dispatch(createStack(name, data)),
  updateData: (name, data) => dispatch(updateData(name, data)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  resetData: () => dispatch(resetData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewStack);
