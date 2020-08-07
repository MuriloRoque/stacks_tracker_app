import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';
import { feedStacks } from '../actions/index';
import Footer from './Footer';

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

  const result = (hours, hoursGoal, projects, projectsGoal) => {
    if (hoursGoal + projectsGoal === 0) {
      return 100;
    }
    const percentage = ((hours + projects) / (hoursGoal + projectsGoal)) * 100;
    return percentage >= 100 ? 100 : Math.round(percentage);
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  const allStacks = stacks.map(stack => (
    <div key={stack.id} className="p-0">
      <div className="card mb-5 each-stack">
        <div className="card-body d-flex justify-content-between align-items-center">
          <PieChart
            data={[{
              value: 1, color: '#8ce08a', key: `${result(stack.hours, stack.hours_goal, stack.projects, stack.projects_goal)} %`,
            }]}
            reveal={result(stack.hours, stack.hours_goal, stack.projects, stack.projects_goal)}
            lineWidth={20}
            animate
            className="pie-chart"
            label={({ dataEntry }) => dataEntry.key}
            labelStyle={{ fontSize: '1.4rem' }}
          />
          <h5 className="card-title m-0">{stack.name}</h5>
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
    <div className="d-flex align-items-center justify-content-center">
      <h4>
        No stacks yet. Why not create one?
      </h4>
    </div>
  );

  return (
    <>
      <div className="header-title">
        Track.it
      </div>
      <div className="py-10">
        <main className="container p-0">
          <div className="m-0">
            {stacks.length > 0 ? allStacks : noStack}
          </div>
        </main>
      </div>
      <Footer />
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
