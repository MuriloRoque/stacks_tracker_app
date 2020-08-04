import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { feedStacks } from '../actions/index';
import addImg from '../../assets/images/add-stack.png';
import home from '../../assets/images/home.png';
import trackIt from '../../assets/images/track-it.png';
import progress from '../../assets/images/progress.png';

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
