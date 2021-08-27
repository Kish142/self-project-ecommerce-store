import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { HiOutlineSearch } from 'react-icons/hi';

import './Navigation.styles.scss';

import CartToggle from './Cart-toggle/CartToggle';
import Auth from '../Auth/Index';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useHttpClient } from '../../custom-hook/httpclient';
import { logoutUser } from '../../redux/user/user.action';
import LoadingSpinner from '../Loading-spinner/LoadingSpinner';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import { selectProductItems } from '../../redux/product/product.selector';

const Navigation = ({ currentUser, logoutUser, cartCount, productList }) => {
  const menu = useRef();
  const cart = useRef();
  const auth = useRef();
  const loginRef = useRef();
  const registerRef = useRef();
  const deskSearchFilter = useRef();
  const mobSearchFilter = useRef();
  const logout = useRef();

  const [hamburgerToggle, setHamburgerToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [authToggle, setAuthToggle] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [logoutToggle, setLogoutToggle] = useState(false);

  const [searchTerm, setSearchTerm] = useState();

  const [deskSearchFilterDropdown, setDeskSearchFilterDropdown] =
    useState(false);
  const [mobSearchFilterDropdown, setMobSearchFilterDropdown] = useState(false);

  // console.log(searchTerm);

  const updateCartToggle = () => setCartToggle(false);

  const { sendRequest, isLoading } = useHttpClient();

  // console.log(currentUser);

  useEffect(() => {
    !!currentUser && setAuthToggle(false);

    const checkClickableOutsie = (event) => {
      hamburgerToggle &&
        menu.current &&
        !menu.current.contains(event.target) &&
        setHamburgerToggle(false);

      cartToggle &&
        cart.current &&
        !cart.current.contains(event.target) &&
        setCartToggle(false);

      authToggle &&
        auth.current &&
        !auth.current.contains(event.target) &&
        setAuthToggle(false);

      // logoutToggle &&
      //   logout.current &&
      //   !logout.current.contains(event.target) &&
      //   setLogoutToggle(false);

      deskSearchFilterDropdown &&
        deskSearchFilter.current &&
        !deskSearchFilter.current.contains(event.target) &&
        event.target.className !== 'desk-search-filter' &&
        setDeskSearchFilterDropdown(false);

      mobSearchFilterDropdown &&
        mobSearchFilter.current &&
        !mobSearchFilter.current.contains(event.target) &&
        event.target.className !== 'mob-search-filter' &&
        setMobSearchFilterDropdown(false);
    };

    document.addEventListener('mousedown', checkClickableOutsie);

    hamburgerToggle ||
    cartToggle ||
    (authToggle && !!currentUser === false) ||
    isLoading
      ? document.body.style.setProperty('overflow', 'hidden', 'important')
      : document.body.style.setProperty('overflow', 'auto');
  }, [
    hamburgerToggle,
    cartToggle,
    authToggle,
    isLoading,
    currentUser,
    mobSearchFilterDropdown,
    deskSearchFilterDropdown,
    logoutToggle,
  ]);

  const userLogout = async () => {
    setHamburgerToggle(false);
    const response = await sendRequest('/auth/logout', 'post');

    if (response) {
      logoutUser();
      localStorage.clear();
      document.querySelector('.user-message-logout').style.display = 'block';

      setTimeout(() => {
        document.querySelector('.user-message-logout').style.display = 'none';
      }, 2000);
    }
  };

  const searchFilter =
    productList &&
    !!searchTerm &&
    productList.product.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.name
    );

  return (
    <section className='header'>
      {isLoading && <LoadingSpinner />}
      <header>
        <div
          style={{
            display:
              hamburgerToggle ||
              cartToggle ||
              (authToggle && !!currentUser === false)
                ? 'block'
                : 'none',
          }}
          className='overlay-for-toggle'></div>
        <div className='user-message-logout'>
          <div className='user-message-wrapper'>
            <p>Logged out succesfully</p>
          </div>
        </div>
        <nav className='nav-bar flex flex-jc-sb flex-ai-c'>
          <div className='mobile-menu'>
            <div className='icon hamburger-menu'>
              <AiOutlineMenu
                onClick={() => setHamburgerToggle(!hamburgerToggle)}
              />
            </div>

            <div
              ref={menu}
              style={{ display: hamburgerToggle ? 'block' : 'none' }}
              className='mobile-menu-wrap'>
              <div className='mobile-product-search'>
                <form action=''>
                  <input
                    className='mob-search-filter'
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setMobSearchFilterDropdown(true);
                    }}
                    type='text'
                    placeholder='Search Products...'
                  />
                  <div
                    ref={mobSearchFilter}
                    style={{
                      display:
                        !!searchTerm &&
                        mobSearchFilterDropdown &&
                        mobSearchFilterDropdown
                          ? 'block'
                          : 'none',
                    }}
                    className='product-search-dropdown'>
                    {!!searchFilter &&
                      searchFilter.map((product) => (
                        <div
                          key={product._id}
                          className='product-search-dropdown-list'>
                          <Link
                            to={(location) => {
                              window.scrollTo({ top: 0, behavior: 'smooth' });

                              if (location.pathname.startsWith('/product/')) {
                                return `${product._id}`;
                              } else {
                                return `product/${product._id}`;
                              }
                            }}>
                            <p
                              onClick={() => {
                                setDeskSearchFilterDropdown(false);
                                setHamburgerToggle(false);
                              }}>
                              {product.name}
                              <span
                                style={{ fontWeight: '500', fontSize: '13px' }}>
                                (Rs, {product.price})
                              </span>
                            </p>
                          </Link>
                        </div>
                      ))}
                  </div>
                  <button className='submit' type='button'>
                    <HiOutlineSearch />
                  </button>
                </form>
              </div>
              <div className='menu'>
                <div className='title'>
                  <h1>Menu</h1>
                </div>
                <div className='items'>
                  <h4>Mens</h4>
                  <h4>Womens</h4>
                  <h4>Kids</h4>
                  <h4>Accessories</h4>
                  <h4>Gifts</h4>
                  {!!currentUser === true && (
                    <h4
                      ref={logout}
                      onClick={userLogout}
                      style={{
                        color: '#444444',
                        fontSize: '17px',
                        cursor: 'pointer',
                      }}>
                      Logout
                    </h4>
                  )}

                  {!!currentUser === false && (
                    <div className='auth'>
                      <button
                        ref={loginRef}
                        onClick={() => {
                          setAuthToggle(true);
                          setHamburgerToggle(false);
                          setLogin(true);
                          setRegister(false);
                        }}
                        className='login'>
                        Login
                      </button>
                      <span>(or)</span>
                      <button
                        ref={registerRef}
                        onClick={() => {
                          setHamburgerToggle(false);
                          setAuthToggle(true);
                          setRegister(true);
                          setLogin(false);
                        }}
                        className='signup'>
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='logo'>
            <Link to='/'>
              <h1>Logossss</h1>
            </Link>
          </div>

          <div className='product-search'>
            <form action=''>
              <select defaultValue='none' className='category'>
                <option hidden value='none'>
                  Select a category
                </option>
                <option value=''>Mens</option>
                <option value=''>Womens</option>
                <option value=''>Kids</option>
                <option value=''>Accessories</option>
              </select>
              <input
                className='desk-search-filter'
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setDeskSearchFilterDropdown(true);
                }}
                type='text'
                placeholder='Search for a product...'
              />
              <div
                ref={deskSearchFilter}
                style={{
                  display:
                    !!searchTerm &&
                    deskSearchFilterDropdown &&
                    deskSearchFilterDropdown
                      ? 'block'
                      : 'none',
                }}
                className='product-search-dropdown'>
                {!!searchFilter &&
                  searchFilter.map((product) => (
                    <div
                      key={product._id}
                      className='product-search-dropdown-list'>
                      <Link
                        to={(location) => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });

                          if (location.pathname.startsWith('/product/')) {
                            return `${product._id}`;
                          } else {
                            return `product/${product._id}`;
                          }
                        }}>
                        <p onClick={() => setDeskSearchFilterDropdown(false)}>
                          {product.name}
                          <span style={{ fontWeight: '500', fontSize: '13px' }}>
                            (Rs, {product.price})
                          </span>
                        </p>
                      </Link>
                    </div>
                  ))}
              </div>
              <button className='submit' type='button'>
                <HiOutlineSearch />
              </button>
            </form>
          </div>

          <div className='cart-profile-wishlist-icons flex flex-jc-sb flex-ai-c'>
            <div className='cart-container'>
              <div
                onClick={() => setCartToggle(!cartToggle)}
                className='icon cart-icon'>
                <FiShoppingCart />
                <span>{cartCount}</span>
              </div>
              <div className='cart-sidebar' ref={cart}>
                <CartToggle
                  toggle={cartToggle}
                  updateToggle={updateCartToggle}
                />
              </div>
            </div>

            <div className='user-container'>
              <div className='user-menu'>
                <div
                  onClick={() => {
                    console.log('auth clicked');
                    if (!!currentUser === false) setAuthToggle(!authToggle);
                    if (!!currentUser === true) setLogoutToggle(!logoutToggle);
                  }}
                  className='icon user-icon'>
                  <FaRegUser />
                  <span>7</span>
                </div>
                {!!currentUser === true && (
                  <div
                    style={{ display: logoutToggle ? 'block' : 'none' }}
                    onClick={userLogout}
                    className='user-list-dropdown'>
                    <div className='user-list-dropdown-wrapper'>
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </div>
              {!!currentUser === false && (
                <div className='auth-login-register-popup' ref={auth}>
                  <Auth toggle={authToggle} login={login} register={register} />
                </div>
              )}
            </div>

            <div className='icon wishlist-icon'>
              <BsHeart />
              <span>2</span>
            </div>
          </div>
        </nav>
      </header>
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  cartCount: selectCartItemsCount(state),
  productList: selectProductItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
