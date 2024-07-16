/* eslint-disable no-unused-vars */
function SessionReducer(session, action) {
  switch (action.type) {
    case 'LOGIN':
        console.log("loggedin");
      return { isLoggedIn:true };
    case 'LOGOUT':
      return { isLoggedIn:false };
    default:
      return session;
  }
}

export default SessionReducer;