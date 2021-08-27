export const addCartItem = (item) => ({
  type: 'ADD_CART_ITEM',
  payload: item,
});

export const removeCartItem = (item) => ({
  type: 'REMOVE_CART_ITEM',
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: 'CLEAR_CART_ITEM',
  payload: item,
});
