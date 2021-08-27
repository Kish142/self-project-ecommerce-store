export const setCurrentUser = (user) => ({
  type: 'CURRENT_USER',
  payload: user,
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});
