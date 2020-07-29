import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Dashboard = ({loginStatus}) => (
  <div>
    <h1>Welcome to the Stacks Tracker!</h1>
    <h1>Status: {loginStatus}</h1>
  </div>
);

Dashboard.propTypes = {
  loginStatus: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  loginStatus: state.loginStatus,
});

export default connect(mapStateToProps)(Dashboard);
