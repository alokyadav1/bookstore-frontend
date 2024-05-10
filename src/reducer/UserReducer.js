/* eslint-disable no-unused-vars */
function UserReducer(user,action){
    switch(action.type){
        case "SET_USER":
            return action.payload
        case "LOGOUT":
            return null;
        default:
            return user
    }
}
export default UserReducer;