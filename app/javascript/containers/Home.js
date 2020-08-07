import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  login, updateData, logout, resetData,
} from '../actions/index';
import logoutIcon from '../../assets/images/logout.png';
import Footer from './Footer';

const Home = ({
  loginStatus, updateData, login, logout, resetData, user,
}) => {
  const checkLoginStatus = () => {
    axios.get('http://localhost:3000/api/v1/logged_in', { withCredentials: true })
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
    axios.delete('http://localhost:3000/api/v1/logout', { withCredentials: true })
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
              <Footer />
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
