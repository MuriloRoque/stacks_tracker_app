import axios from 'axios';
import * as types from '../constants/actionTypes';

export const updateData = (name, data) => ({
  type: types.UPDATE_DATA,
  name,
  data,
});

export const resetData = () => ({
  type: types.LOGOUT,
});

export const login = () => ({
  type: types.LOGIN,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const feedStacks = data => ({
  type: types.FEED_STACKS,
  data,
});

export const feedProgress = data => ({
  type: types.FEED_PROGRESS,
  data,
});

export const createStack = (name, data) => ({
  type: types.CREATE_STACK,
  name,
  data,
});

export const checkLoginStatus = loginStatus => dispatch => {
  axios.get('http://localhost:3000/api/v1/logged_in', { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && loginStatus === 'NOT_LOGGED_IN') {
        dispatch(login());
        dispatch(updateData('email', response.data.user.email));
      } else if (!response.data.logged_in && loginStatus === 'LOGGED_IN') {
        dispatch(logout());
        dispatch(resetData());
      }
    });
};

export const handleLogout = () => dispatch => {
  axios.delete('http://localhost:3000/api/v1/logout', { withCredentials: true })
    .then(() => {
      dispatch(logout());
      dispatch(resetData());
    });
};

export const submitLogin = (history, user) => dispatch => {
  axios.post('http://localhost:3000/api/v1/sessions', { user },
    { withCredentials: true }).then(response => {
    if (response.data.logged_in) {
      dispatch(login());
      dispatch(updateData('userId', response.data.user.id));
      history.push('/');
    } else {
      dispatch(updateData('loginErrors', 'Wrong e-mail or password'));
    }
  });
};

export const submitSignup = (history, user) => dispatch => {
  axios.post('http://localhost:3000/api/v1/registrations', { user: { email: user.email, password: user.password, password_confirmation: user.passwordConfirmation } },
    { withCredentials: true }).then(response => {
    if (response.data.status === 'created') {
      dispatch(login());
      dispatch(updateData('userId', response.data.user.id));
      history.push('/');
    } else {
      dispatch(updateData('registrationErrors', response.data.errors.join('; ')));
    }
  });
};

export const checkLogin = (loginStatus, user, history) => dispatch => {
  if (loginStatus === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  dispatch(createStack('userId', user.userId));
};

export const submitEdit = (history, id, stack) => {
  axios.put(`http://localhost:3000/api/v1/update/${id}`, {
    stack: {
      name: stack.name,
      hours: stack.hours,
      hours_goal: stack.hoursGoal,
      projects: stack.projects,
      projects_goal: stack.projectsGoal,
      user_id: stack.userId,
    },
  },
  { withCredentials: true }).then(response => {
    if (response.data.status === 'created') {
      history.push(`/stack/${id}`);
    }
  });
};

export const submitNew = (history, stack) => {
  axios.post('http://localhost:3000/api/v1/stacks/create', {
    stack: {
      name: stack.name,
      hours: stack.hours,
      hours_goal: stack.hoursGoal,
      projects: stack.projects,
      projects_goal: stack.projectsGoal,
      user_id: stack.userId,
    },
  },
  { withCredentials: true }).then(response => {
    if (response.data.status === 'created') {
      history.push(`/stack/${response.data.stack.id}`);
    }
  });
};

export const fetchStack = (loginStatus, history, id) => dispatch => {
  if (loginStatus === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  axios.get(`http://localhost:3000/api/v1/show/${id}`, { withCredentials: true })
    .then(response => {
      if (response.statusText === 'OK') {
        dispatch(createStack('name', response.data.name));
        dispatch(createStack('hours', response.data.hours));
        dispatch(createStack('hoursGoal', response.data.hours_goal));
        dispatch(createStack('projects', response.data.projects));
        dispatch(createStack('projectsGoal', response.data.projects_goal));
      }
    });
};

export const deleteStack = (id, history) => {
  axios.delete(`http://localhost:3000/api/v1/destroy/${id}`, { withCredentials: true })
    .then(response => {
      if (response.statusText === 'OK') {
        history.push('/stacks');
      }
    });
};

export const fetchStacks = (loginStatus, history) => dispatch => {
  if (loginStatus === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  axios.get('http://localhost:3000/api/v1/stacks/index', { withCredentials: true })
    .then(response => {
      if (response.statusText === 'OK') {
        dispatch(feedStacks(response.data));
      }
    });
};

export const fetchProgress = (loginStatus, history) => dispatch => {
  if (loginStatus === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  axios.get('http://localhost:3000/api/v1/stacks/progress', { withCredentials: true })
    .then(response => {
      if (response.statusText === 'OK') {
        dispatch(feedProgress(response.data.progress));
      }
    });
};
