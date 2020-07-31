import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { feedStacks } from '../actions/index';

const Stacks = ({ stacks, feedStacks, loginStatus }) => {
  const history = useHistory();

  const fetchStacks = () => {
    if (loginStatus === 'NOT_LOGGED_IN') {
      history.push('/');
    }
    axios.get('http://localhost:3000/api/v1/stacks/index', { withCredentials: true })
      .then(response => {
        if (response.statusText === 'OK') {
          feedStacks(response.data);
        }
      });
  };

  useEffect(() => {
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
  feedStacks: PropTypes.func.isRequired,
  stacks: PropTypes.instanceOf(Array).isRequired,
  loginStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  stacks: state.stacks,
  loginStatus: state.loginStatus,
});

const mapDispatchToProps = dispatch => ({
  feedStacks: data => dispatch(feedStacks(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stacks);
