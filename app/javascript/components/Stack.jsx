import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  login, updateData, logout, resetData, createStack,
} from '../actions/index';

const Stack = ({
  loginStatus, updateData, login, logout, resetData, createStack, match, stack,
}) => {
  const { id } = match.params;

  const checkLoginStatus = () => {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loginStatus === 'NOT_LOGGED_IN') {
          login();
          updateData('email', response.data.user.email);
        } else if (!response.data.logged_in && loginStatus === 'LOGGED_IN') {
          logout();
          resetData();
        }
      });
  };

  const fetchStack = () => {
    axios.get(`http://localhost:3000/api/v1/show/${id}`, { withCredentials: true })
      .then(response => {
        if (response.statusText === 'OK') {
          createStack('name', response.data.name);
          createStack('hours', response.data.hours);
          createStack('hoursGoal', response.data.hours_goal);
          createStack('projects', response.data.projects);
          createStack('projectsGoal', response.data.projects_goal);
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
    fetchStack();
  }, []);

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {stack.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Stats</h5>
            <div>
              {stack.hours}
            </div>
            <div>
              {stack.hoursGoal}
            </div>
            <div>
              {stack.projects}
            </div>
            <div>
              {stack.projectsGoal}
            </div>
          </div>
          <div className="col-sm-12 col-lg-2">
            <button type="button" className="btn btn-danger">
              Delete Stack
            </button>
          </div>
        </div>
        <Link to="/stacks" className="btn btn-link">
          Back to stacks
        </Link>
      </div>
    </div>
  );
};

Stack.propTypes = {
  loginStatus: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  createStack: PropTypes.func.isRequired,
  stack: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
    hoursGoal: PropTypes.number.isRequired,
    projects: PropTypes.number.isRequired,
    projectsGoal: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  loginStatus: state.loginStatus,
  stack: state.stack,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  resetData: () => dispatch(resetData()),
  createStack: (name, data) => dispatch(createStack(name, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
