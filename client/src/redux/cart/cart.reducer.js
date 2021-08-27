import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case 'CLEAR_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
