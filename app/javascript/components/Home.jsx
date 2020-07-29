import React, { useEffect } from "react";
import Registration from "./auth/Registration";
import axios from 'axios';
import { login, updateData, logout, resetData } from '../actions/index';
import { connect } from 'react-redux';

const Home = ({history, loginStatus, updateData, login, logout, resetData}) => {

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
      <Registration history={history} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

const mapStateToProps = state => ({
  loginStatus: state.loginStatus,
});

const mapDispatchToProps = dispatch => ({
  updateData: (name, data) => dispatch(updateData(name, data)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  resetData: () => dispatch(resetData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
