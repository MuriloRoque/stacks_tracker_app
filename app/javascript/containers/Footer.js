import React from 'react';
import addImg from '../../assets/images/add-stack.png';
import home from '../../assets/images/home.png';
import trackIt from '../../assets/images/track-it.png';
import progress from '../../assets/images/progress.png';
import { Link } from 'react-router-dom';

const Footer = () => (

<footer className="footer mt-auto w-100 button-footer d-flex align-items-center">
                <Link
                  to="/stack"
                  className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
                  role="button"
                >
                  <img className="footer-img" src={addImg} alt="add-stack" />
                  <p className="mb-0">Add stack</p>
                </Link>
                <Link
                  to="/stacks"
                  className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
                  role="button"
                >
                  <img className="footer-img" src={trackIt} alt="add-stack" />
                  <p className="mb-0">Track.it</p>
                </Link>
                <Link
                  to="/progress"
                  className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
                  role="button"
                >
                  <img className="footer-img" src={progress} alt="add-stack" />
                  <p className="mb-0">Your progress</p>
                </Link>
                <Link
                  to="/"
                  className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
                  role="button"
                >
                  <img className="footer-img" src={home} alt="add-stack" />
                  <p className="mb-0">Home</p>
                </Link>
              </footer>
)

export default Footer;