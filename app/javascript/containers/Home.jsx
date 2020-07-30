import React, { useEffect } from "react";
import axios from 'axios';
import { login, updateData, logout, resetData } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Home = ({ loginStatus, updateData, login, logout, resetData, user}) => {

  const checkLoginStatus = () => {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && loginStatus === 'NOT_LOGGED_IN') {
        login();
        updateData('email', response.data.user.email);
      }
      else if (!response.data.logged_in && loginStatus === 'LOGGED_IN') {
        logout();
        resetData();
      }
    }).catch(error => {
      console.log('check login errors', error);
    })
  }

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = () => {
    axios.delete('http://localhost:3000/logout', { withCredentials: true })
    .then(response => {
      logout();
      resetData();
    }).catch(error => {
      console.log('logout error', error)
    })
  }

  return (
    <div>
      {
        loginStatus === 'NOT_LOGGED_IN' ?
        <div className='container py-5'>
          <Link to='/login' className="btn custom-button">
              Login
          </Link>
          <Link to='/signup' className="btn custom-button">
              Signup
          </Link>
        </div> :
        <div className='container py-5'>
          <h1>Welcome {user.email}</h1>
          <button className="btn custom-button" onClick={handleLogout}>Logout</button>
        </div>
      }
    </div>
  );
}

Home.propTypes = {
  loginStatus: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
}

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
