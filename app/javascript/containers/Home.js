import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  login, updateData, logout, resetData,
} from '../actions/index';
import addImg from '../../assets/images/add-stack.png';
import home from '../../assets/images/home.png';
import trackIt from '../../assets/images/track-it.png';
import progress from '../../assets/images/progress.png';
import logoutIcon from '../../assets/images/logout.png';

const Home = ({
  loginStatus, updateData, login, logout, resetData, user,
}) => {
  const checkLoginStatus = () => {
    axios.get('https://murilo-stacks-tracker.herokuapp.com/logged_in', { withCredentials: true })
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

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = () => {
    axios.delete('https://murilo-stacks-tracker.herokuapp.com/logout', { withCredentials: true })
      .then(() => {
        logout();
        resetData();
      });
  };

  return (
    <div className="h-100">
      {
        loginStatus === 'NOT_LOGGED_IN'
          ? (
            <div className="d-flex flex-column justify-content-around align-items-center login-page">
              <div className="d-flex flex-column justify-content-center">
                <h1 className="text-white">Stacktrack.it</h1>
              </div>
              <div className="container d-flex flex-column justify-content-center">
                <Link to="/login" className="btn custom-button">
                  Login
                </Link>
                <Link to="/signup" className="btn custom-button">
                  Signup
                </Link>
              </div>
            </div>
          )
          : (
            <div className="d-flex flex-column h-100">
              <div className="header-title">
                Home
              </div>
              <div className="user-email">
                {user.email}
              </div>
              <div className="logout-button d-flex align-items-center">
                <img className="logout-img" src={logoutIcon} alt="logout" />
                <button type="button" className="btn ml-3" onClick={handleLogout}>Logout</button>
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
                  className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between"
                  role="button"
                >
                  <img className="footer-img" src={progress} alt="add-stack" />
                  <p className="mb-0">Your progress</p>
                </Link>
                <Link
                  to="/"
                  className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between active"
                  role="button"
                >
                  <img className="footer-img" src={home} alt="add-stack" />
                  <p className="mb-0">Home</p>
                </Link>
              </div>
            </div>
          )
      }
    </div>
  );
};

Home.propTypes = {
  loginStatus: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  loginStatus: state.loginStatus,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  resetData: () => dispatch(resetData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
