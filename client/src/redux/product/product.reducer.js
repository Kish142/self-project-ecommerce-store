const INTIALIZE_STATE = {
  product: '',
};

const productReducer = (state = INTIALIZE_STATE, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCT':
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
