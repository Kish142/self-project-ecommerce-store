const INTIALIZE_STATE = {
  user: null,
};

const userReducer = (state = INTIALIZE_STATE, action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
