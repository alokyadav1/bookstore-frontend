function cartReducer(cart, action) {
    switch (action.type) {
        case "SET_CART":
            return action.payload

        case "ADD_TO_CART":
            return [...cart, action.payload]

        case "UPDATE_CART":
            return cart.map(item => {
                if (item.book.bookID == action.payload.bookID) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            })

        case "INCREMENT":
            return cart.map(item => {
                if (item.book.bookID == action.payload.bookID) {
                    item.quantity = item.quantity + 1;
                }
                return item;
            })

        case "DECREMENT":
            return cart.map(item => {
                if (item.book.bookID == action.payload.bookID) {
                    if (item.quantity > 1) {
                        item.quantity = item.quantity - 1;
                    }
                }
                return item;
            })

        case "REMOVE_FROM_CART":
            cart = cart.filter(item => item.book.bookID != action.payload.bookID)
            return cart;

        case "DELETE_CART":
            return [];

        default:
            break;
    }
}

export default cartReducer;

// [
//     {
//         "books":{

//         },
//         "quantity":1
//     }
// ]