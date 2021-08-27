import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import productReducer from './product/product.reducer';

const persistConfig = {
  key: process.env.REACT_APP_LOCAL_STORAGE_KEY,
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
});

export default persistReducer(persistConfig, rootReducer);
