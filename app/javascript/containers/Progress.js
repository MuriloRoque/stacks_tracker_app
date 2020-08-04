import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { feedProgress } from '../actions/index';
import addImg from '../../assets/images/add-stack.png';
import home from '../../assets/images/home.png';
import trackIt from '../../assets/images/track-it.png';
import progressimg from '../../assets/images/progress.png';
import { PieChart } from 'react-minimal-pie-chart';

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

  const result = (hours, goal) => {
    if (goal === 0) {
      return 100;
    }
    const percentage = hours / goal * 100
    return percentage >= 100 ? 100 : percentage 
  }

  useEffect(() => {
    fetchProgress();
  }, []);

  const allProgress = (
    <div>
      <div className="d-flex flex-column justify-content-arount align-items-center">
        <div className='mb-3 p-3 d-flex flex-column align-items-center justify-content-around stats-ctn'>
          <PieChart
            data={[{ value: 1, key: 1, color: '#8ce08a', key: `${result(progress.total_hours, progress.total_hours_goal)} %` }]}
            reveal={result(progress.total_hours, progress.total_hours_goal)}
            lineWidth={20}
            animate
            className='pie-chart mb-3'
            label={({ dataEntry }) => dataEntry.key}
            labelStyle={{fontSize: '1.6rem'}}
          />
          <p className='text-center'>{progress.total_hours} / {progress.total_hours_goal} hours completed</p>
        </div>
        <div className='p-3 d-flex flex-column align-items-center justify-content-around stats-ctn'>
          <PieChart
            data={[{ value: 1, key: 1, color: '#8ce08a', key: `${result(progress.total_projects, progress.total_projects_goal)} %` }]}
            reveal={result(progress.total_projects, progress.total_projects_goal)}
            lineWidth={20}
            animate
            className='pie-chart mb-3'
            label={({ dataEntry }) => dataEntry.key}
            labelStyle={{fontSize: '1.6rem'}}
          />
          <p className='text-center'>{progress.total_projects} / {progress.total_projects_goal} projects completed</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='header-title'>
        Progress report
      </div>
      <div className="py-4">
        <main className="container">
          <div className="text-center">
            {allProgress}
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
          className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between"
          role="button"
        >
          <img className="footer-img" src={trackIt} alt="add-stack" />
          <p className="mb-0">Track.it</p>
        </Link>
        <Link
          to="/progress"
          className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between active"
          role="button"
        >
          <img className="footer-img" src={progressimg} alt="add-stack" />
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
