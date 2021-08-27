import { createSelector } from 'reselect';

const selectProduct = (state) => state.product;

export const selectProductItems = createSelector(
  [selectProduct],
  (product) => product.product
);
