import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkLoginStatus, handleLogout } from '../actions/index';
import logoutIcon from '../../assets/images/logout.png';
import Footer from './Footer';

const Home = ({
  loginStatus, user, checkLoginStatus, handleLogout,
}) => {
  useEffect(() => {
    checkLoginStatus(loginStatus);
  }, [checkLoginStatus]);

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
  checkLoginStatus: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  loginStatus: state.loginStatus,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: loginStatus => dispatch(checkLoginStatus(loginStatus)),
  handleLogout: () => dispatch(handleLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
