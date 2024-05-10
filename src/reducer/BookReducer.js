function BookReducer(books, action){
    switch (action.type) {
        case "SET_BOOK":
            return action.payload;
        default:
            return books;
    }
}

export default BookReducer;