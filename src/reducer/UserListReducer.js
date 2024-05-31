
function UserListReducer(userList,action){
    switch (action.type) {
        case "SET_USER_LIST":
            return action.payload
    
        default:
            return userList;
    }
}

export default UserListReducer