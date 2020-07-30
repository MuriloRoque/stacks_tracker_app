import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  login, updateData, logout, resetData, feedStacks,
} from '../actions/index';

const Stacks = ({
  loginStatus, updateData, login, logout, resetData, stacks, feedStacks,
}) => {
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

  const fetchStacks = () => {
    axios.get('http://localhost:3000/api/v1/stacks/index', { withCredentials: true })
      .then(response => {
        if (response.statusText === 'OK') {
          feedStacks(response.data);
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
    fetchStacks();
  }, []);

  const allStacks = stacks.map(stack => (
    <div key={stack.id} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{stack.name}</h5>
          <Link
            to={{
              pathname: `/stack/${stack.id}`,
              state:
                       {
                         name: stack.name,
                         hours: stack.hours,
                         hoursGoal: stack.hours_goal,
                         projects: stack.projects,
                         projectsGoal: stack.projects_goal,
                       },
            }}
            className="btn custom-button"
          >
            View Stack
          </Link>
        </div>
      </div>
    </div>
  ));

  const noStack = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No stacks yet. Why not create one?
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Stacks you are learning</h1>
          <p className="lead text-muted">
            This is the stacks page, where you can see all stacks you are currently learning.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">
            {stacks.length > 0 ? allStacks : noStack}
          </div>
        </main>
      </div>
      <div>
        <Link
          to="/stacks"
          className="btn btn-lg custom-button"
          role="button"
        >
          Track.it
        </Link>
        <Link
          to="/stack"
          className="btn btn-lg custom-button"
          role="button"
        >
          Add Stack
        </Link>
        <Link
          to="/progress"
          className="btn btn-lg custom-button"
          role="button"
        >
          Your progress
        </Link>
        <Link
          to="/"
          className="btn btn-lg custom-button"
          role="button"
        >
          Home
        </Link>
      </div>
    </>
  );
};

Stacks.propTypes = {
  loginStatus: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  feedStacks: PropTypes.func.isRequired,
  stacks: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  loginStatus: state.loginStatus,
  stacks: state.stacks,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  resetData: () => dispatch(resetData()),
  feedStacks: data => dispatch(feedStacks(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stacks);
