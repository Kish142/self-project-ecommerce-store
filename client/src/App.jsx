import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import Footer from './components/Footer/Index';
import Header from './components/Navigation/Navigation';
import HomePage from './pages/Home-page/HomePage';
import ShopPage from './pages/Shop-page/ShopPage';
import ProductPage from './pages/Product-page/ProductPage';
import CartPage from './pages/Cart-page/CartPage';
import CheckoutPage from './pages/Checkout-page/CheckoutPage';
import AdminPage from './pages/Admin-page/AdminPage';
import { useHttpClient } from './custom-hook/httpclient';

import { getAllProduct } from './redux/product/product.action';
import LoadingSpinner from './components/Loading-spinner/LoadingSpinner';
import { selectCurrentUser } from './redux/user/user.selector';
import { setCurrentUser } from './redux/user/user.action';
import PageNotFound from './components/404-page/PageNotFound';

function App({ product, currentUser, setCurrentUser }) {
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchRequest = async () => {
      const getProduct = await sendRequest('product');

      getProduct && product(getProduct);

      console.log('app running');

      if (!!currentUser === false) {
        const getCurrentUser = await sendRequest('current-user', 'get');

        if (getCurrentUser && getCurrentUser.msg) return;

        console.log(getCurrentUser);

        getCurrentUser && setCurrentUser(getCurrentUser);
      }
    };

    fetchRequest();
  }, [sendRequest, product, currentUser, setCurrentUser]);

  useEffect(() => {
    isLoading
      ? document.body.style.setProperty('overflow', 'hidden', 'important')
      : document.body.style.setProperty('overflow', 'auto');
  }, [isLoading]);

  return (
    <div className='App'>
      {isLoading && <LoadingSpinner />}

      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop-page' component={ShopPage} />
        <Route exact path='/product/:id' component={ProductPage} />
        <Route exact path='/cart' component={CartPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/admin-dashboard'
          render={() =>
            !!currentUser === true &&
            currentUser.user &&
            currentUser.user.role === 'admin' ? (
              <AdminPage />
            ) : (
              <Redirect to='/' />
            )
          }
        />
        <Route exact path='*' component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  product: (item) => dispatch(getAllProduct(item)),
  setCurrentUser: (item) => dispatch(setCurrentUser(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
