import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import Footer from './components/Footer/Index';
import Header from './components/Navigation/Navigation';
import HomePage from './pages/Home-page/HomePage';
import { useHttpClient } from './custom-hook/httpclient';

import { getAllProduct } from './redux/product/product.action';
import LoadingSpinner from './components/Loading-spinner/LoadingSpinner';
import { selectCurrentUser } from './redux/user/user.selector';
import { setCurrentUser } from './redux/user/user.action';

const ShopPage = React.lazy(() => import('./pages/Shop-page/ShopPage'));
const ProductPage = React.lazy(() =>
  import('./pages/Product-page/ProductPage')
);
const CartPage = React.lazy(() => import('./pages/Cart-page/CartPage'));
const CheckoutPage = React.lazy(() =>
  import('./pages/Checkout-page/CheckoutPage')
);
const AdminPage = React.lazy(() => import('./pages/Admin-page/AdminPage'));
const PageNotFound = React.lazy(() =>
  import('./components/404-page/PageNotFound')
);

function App({ product, currentUser, setCurrentUser }) {
  const { isLoading, sendRequest } = useHttpClient();

  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

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
      <React.Suspense fallback={<LoadingSpinner />}>
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
          <Route component={PageNotFound} />
        </Switch>
      </React.Suspense>
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
