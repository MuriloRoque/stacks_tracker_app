import React from "react";
import { Link } from "react-router-dom";

export default ({location}) => {
  const {name, hours, hoursGoal, projects, projectsGoal} = location.state
  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Stats</h5>
            <div>
              {hours}
            </div>
            <div>
              {hoursGoal}
            </div>
            <div>
              {projects}
            </div>
            <div>
              {projectsGoal}
            </div>
          </div>
          <div className="col-sm-12 col-lg-2">
            <button type="button" className="btn btn-danger">
              Delete Stack
            </button>
          </div>
        </div>
        <Link to="/stacks" className="btn btn-link">
          Back to stacks
        </Link>
      </div>
    </div>
  );
}
