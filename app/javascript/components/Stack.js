import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStack } from '../actions/index';
import addImg from '../../assets/images/add-stack.png';
import home from '../../assets/images/home.png';
import trackIt from '../../assets/images/track-it.png';
import progress from '../../assets/images/progress.png';

const Stack = ({
  loginStatus, createStack, match, stack,
}) => {
  const { id } = match.params;
  const history = useHistory();

  const fetchStack = () => {
    if (loginStatus === 'NOT_LOGGED_IN') {
      history.push('/');
    }
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

  const deleteStack = () => {
    axios.delete(`http://localhost:3000/api/v1/destroy/${id}`, { withCredentials: true })
      .then(response => {
        if (response.statusText === 'OK') {
          history.push('/stacks');
        }
      });
  };

  useEffect(() => {
    fetchStack();
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative">
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
            <Link
              to={`/edit/${id}`}
              className="btn btn-lg custom-button"
              role="button"
            >
              Edit Stack
            </Link>
            <button onClick={deleteStack} type="button" className="btn btn-danger">
              Delete Stack
            </button>
          </div>
        </div>
        <Link to="/stacks" className="btn btn-link">
          Back to stacks
        </Link>
      </div>
      <div className="footer mt-auto w-100 button-footer d-flex align-items-center">
        <Link
          to="/stack"
          className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between"
          role="button"
        >
          <img className="footer-img" src={addImg} alt="add-stack" />
          <p className="mb-0">Add stack</p>
        </Link>
        <Link
          to="/stacks"
          className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between active"
          role="button"
        >
          <img className="footer-img" src={trackIt} alt="add-stack" />
          <p className="mb-0">Track.it</p>
        </Link>
        <Link
          to="/progress"
          className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between"
          role="button"
        >
          <img className="footer-img" src={progress} alt="add-stack" />
          <p className="mb-0">Your progress</p>
        </Link>
        <Link
          to="/"
          className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between"
          role="button"
        >
          <img className="footer-img" src={home} alt="add-stack" />
          <p className="mb-0">Home</p>
        </Link>
      </div>
    </div>
  );
};

Stack.propTypes = {
  loginStatus: PropTypes.string.isRequired,
  createStack: PropTypes.func.isRequired,
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
  createStack: (name, data) => dispatch(createStack(name, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
