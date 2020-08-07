import React, { useCallback, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStack } from '../actions/index';
import Footer from '../containers/Footer';

const EditStack = ({
  stack, createStack, loginStatus, user, match,
}) => {
  const history = useHistory();
  const { id } = match.params;

  const checkLoginStatus = () => {
    if (loginStatus === 'NOT_LOGGED_IN') {
      history.push('/');
    }
    createStack('userId', user.userId);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const createDataChange = useCallback(e => {
    createStack(e.target.name, e.target.value);
  }, [createStack]);

  const handleSubmit = e => {
    axios.put(`http://localhost:3000/api/v1/update/${id}`, { stack: { name: stack.name, hours: stack.hours, hours_goal: stack.hoursGoal, projects: stack.projects, projects_goal: stack.projectsGoal, user_id: stack.userId } },
      { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        history.push(`/stack/${id}`);
      }
    }).catch(error => {
      createStack('createErrors', error.response.statusText);
    });
    e.preventDefault();
  };

  return (
    <div>
      <div className="row mx-0">
        <div className="w-100 px-0">
          <div className="header-title">
            Edit
          </div>
          <form className="add-stack px-5 pt-5 py-10 mb-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="w-100" htmlFor="stackName">
                Stack name
                <input
                  defaultValue={stack.name}
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
                  defaultValue={stack.hours}
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
                  defaultValue={stack.hoursGoal}
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
                  defaultValue={stack.projects}
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
                  defaultValue={stack.projectsGoal}
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
            <button type="submit" className="d-block btn mt-3 custom-button mb-3">
              Save Changes
            </button>
            <Link to={`/stack/${id}`} className="btn btn-lg custom-button">
              Back to stack
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

EditStack.propTypes = {
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
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  stack: state.stack,
  loginStatus: state.loginStatus,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createStack: (name, data) => dispatch(createStack(name, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStack);
