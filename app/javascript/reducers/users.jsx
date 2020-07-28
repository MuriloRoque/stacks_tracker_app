const user = (state = {}, action) => {
  switch (action.type) {
    case 'GET USER':
      return action.payload;
    default:
      return state;
  }
};

export default user;