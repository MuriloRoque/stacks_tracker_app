import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';
import { createStack } from '../actions/index';
import Footer from '../containers/Footer';
import projectsImg from '../../assets/images/projects.png';
import hoursImg from '../../assets/images/hours.png';

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

  const result = (hours, goal) => {
    if (goal === 0) {
      return 100;
    }
    const percentage = (hours / goal) * 100;
    return percentage >= 100 ? 100 : Math.round(percentage);
  };

  useEffect(() => {
    fetchStack();
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="header-title">
        {stack.name}
      </div>
      <div>
        <div className="pie-chart-ctn d-flex justify-content-around align-items-center p-5">
          <div className="d-flex flex-column align-items-center justify-content-around">
            <PieChart
              data={[{
                value: 1, color: '#8ce08a', key: `${result(stack.hours, stack.hoursGoal)} %`,
              }]}
              reveal={result(stack.hours, stack.hoursGoal)}
              lineWidth={20}
              animate
              className="pie-chart"
              label={({ dataEntry }) => dataEntry.key}
              labelStyle={{ fontSize: '1.6rem' }}
            />
            <p className="mt-2">Hours</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-around">
            <PieChart
              data={[{
                value: 1, color: '#8ce08a', key: `${result(stack.projects, stack.projectsGoal)} %`,
              }]}
              reveal={result(stack.projects, stack.projectsGoal)}
              lineWidth={20}
              animate
              className="pie-chart"
              label={({ dataEntry }) => dataEntry.key}
              labelStyle={{ fontSize: '1.6rem' }}
            />
            <p className="mt-2">Projects</p>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div className="mt-3 d-flex justify-content-around align-items-center stats-ctn p-5">
              <img className="stack-img" src={hoursImg} alt="hours" />
              <div className="text-center ml-1">
                {stack.hours}
                {' '}
                /
                {stack.hoursGoal}
                {' '}
                hours completed
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-around align-items-center stats-ctn p-5">
              <img className="stack-img" src={projectsImg} alt="projects" />
              <div className="text-center ml-1">
                {stack.projects}
                {' '}
                /
                {stack.projectsGoal}
                {' '}
                projects completed
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center mt-3 py-10 stack-buttons">
            <Link to="/stacks" className="btn btn-lg custom-button mb-3">
              Back to stacks
            </Link>
            <Link
              to={`/edit/${id}`}
              className="btn btn-lg custom-button mb-3"
              role="button"
            >
              Edit Stack
            </Link>
            <button onClick={deleteStack} type="button" className="btn btn-lg custom-button delete-btn">
              Delete Stack
            </button>
          </div>
        </div>
      </div>
      <Footer />
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
