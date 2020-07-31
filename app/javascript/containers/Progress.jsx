import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { feedProgress } from '../actions/index';

const Progress = ({ progress, feedProgress, loginStatus }) => {
  const history = useHistory();

  const fetchProgress = () => {
    if (loginStatus === 'NOT_LOGGED_IN') {
      history.push('/');
    }
    axios.get('http://localhost:3000/api/v1/stacks/progress', { withCredentials: true })
      .then(response => {
        if (response.statusText === 'OK') {
          feedProgress(response.data.progress);
        }
      });
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const allProgress = (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Hours Completed</h5>
          <p>{progress.total_hours}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Hours Goal</h5>
          <p>{progress.total_hours_goal}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Projects Completed</h5>
          <p>{progress.total_projects}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Projects Goal</h5>
          <p>{progress.total_projects_goal}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Progress</h1>
          <p className="lead text-muted">
            This is the progress page, where you can see your current progress.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">
            {allProgress}
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

Progress.propTypes = {
  feedProgress: PropTypes.func.isRequired,
  progress: PropTypes.shape({
    total_hours: PropTypes.number.isRequired,
    total_hours_goal: PropTypes.number.isRequired,
    total_projects: PropTypes.number.isRequired,
    total_projects_goal: PropTypes.number.isRequired,
  }).isRequired,
  loginStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  progress: state.progress,
  loginStatus: state.loginStatus,
});

const mapDispatchToProps = dispatch => ({
  feedProgress: data => dispatch(feedProgress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
