import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';
import { fetchProgress } from '../actions/index';
import Footer from './Footer';

const Progress = ({ progress, fetchProgress, loginStatus }) => {
  const history = useHistory();

  const result = (hours, goal) => {
    if (goal === 0) {
      return 100;
    }
    const percentage = (hours / goal) * 100;
    return percentage >= 100 ? 100 : Math.round(percentage);
  };

  useEffect(() => {
    fetchProgress(loginStatus, history);
  }, []);

  const allProgress = (
    <div>
      <div className="d-flex flex-column justify-content-arount align-items-center">
        <div className="mb-3 p-3 d-flex flex-column align-items-center justify-content-around stats-ctn">
          <PieChart
            data={[{
              value: 1, color: '#8ce08a', key: `${result(progress.total_hours, progress.total_hours_goal)} %`,
            }]}
            reveal={result(progress.total_hours, progress.total_hours_goal)}
            lineWidth={20}
            animate
            className="pie-chart mb-3"
            label={({ dataEntry }) => dataEntry.key}
            labelStyle={{ fontSize: '1.6rem' }}
          />
          <p className="text-center">
            {progress.total_hours}
            {' '}
            /
            {' '}
            {progress.total_hours_goal}
            {' '}
            hours completed
          </p>
        </div>
        <div className="p-3 d-flex flex-column align-items-center justify-content-around stats-ctn">
          <PieChart
            data={[{
              value: 1, color: '#8ce08a', key: `${result(progress.total_projects, progress.total_projects_goal)} %`,
            }]}
            reveal={result(progress.total_projects, progress.total_projects_goal)}
            lineWidth={20}
            animate
            className="pie-chart mb-3"
            label={({ dataEntry }) => dataEntry.key}
            labelStyle={{ fontSize: '1.6rem' }}
          />
          <p className="text-center">
            {progress.total_projects}
            {' '}
            /
            {' '}
            {progress.total_projects_goal}
            {' '}
            projects completed
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="header-title">
        Progress report
      </div>
      <div className="py-10">
        <main className="container">
          <div className="text-center">
            {allProgress}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

Progress.propTypes = {
  fetchProgress: PropTypes.func.isRequired,
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
  fetchProgress: (loginStatus, history) => dispatch(fetchProgress(loginStatus, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
