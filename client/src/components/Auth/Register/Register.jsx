import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { TextField, CheckBox } from '../../InputField/InputField';
import * as Yup from 'yup';
import { ImSpinner9 } from 'react-icons/im';

import { useHttpClient } from '../../../custom-hook/httpclient';
import { setCurrentUser } from '../../../redux/user/user.action';

const Register = ({ toggle, currentUser }) => {
  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      //   .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  });

  const { error, isLoading, sendRequest } = useHttpClient();

  const onSubmit = async (values) => {
    const { email, password } = values;

    const data = { email, password };

    const response = await sendRequest('/auth/register', 'post', data);

    response && currentUser(response);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    !!currentUser && setLoading(false);
  }, [currentUser]);

  return (
    <section style={{ display: toggle ? 'block' : 'none' }} className='login'>
      {error && <div className='form-error'>{error && <p>{error}</p>}</div>}
      <Formik
        initialValues={{
          email: '',
          password: '',
          rePassword: '',
          rememberMe: '',
        }}
        validationSchema={validate}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className='input-field-text'>
              <TextField label='Email Address' name='email' type='email' />
              <TextField label='Password' name='password' type='password' />
              <TextField
                label='Confirm Password'
                name='rePassword'
                type='password'
              />
            </div>
            <CheckBox
              type='checkbox'
              name='rememberMe'
              label='Remember me'
              id='rememberMe-r'
            />
            <button className='submit-btn' type='submit'>
              {isLoading ? (
                <p
                  className='loading-btn flex flex-ai-c flex-jc-c'
                  style={{ gap: '15px' }}>
                  <span className='flex flex-ai-c loading-spinner-icon'>
                    <ImSpinner9 />
                  </span>
                  Loading...
                </p>
              ) : (
                <p>Register</p>
              )}
            </button>

            <div className='email-or-google-auth'>
              <p>(or)</p>
            </div>
          </Form>
        )}
      </Formik>
      <a href='http://localhost:5000/api/auth/google'>
        <button
          type='button'
          onClick={() => setLoading(true)}
          className='login-with-google-btn flex flex-ai-c flex-jc-c'>
          <img
            className='flex flex-ai-c flex-jc-c'
            src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4='
            alt=''
          />
          {loading ? (
            <span
              className='loading-btn-google flex flex-ai-c flex-jc-c'
              style={{ gap: '15px' }}>
              Register with Google
              <span className='flex flex-ai-c loading-spinner-icon'>
                <ImSpinner9 />
              </span>
            </span>
          ) : (
            'Register with Google'
          )}
        </button>
      </a>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  currentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Register);
