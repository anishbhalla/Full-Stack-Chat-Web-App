import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import chaticon from '../assets/chaticon.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: ''
}


const Auth = () => {
  const [incorrect, setIncorrect] = useState(false);
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }) // Will change the particular field name with its input value.
    // console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    const { fullName, username, password, phoneNumber, avatarURL } = form;

    const URL = 'http://localhost:3000/auth';
    // const { data : {token, userId, hasedPassword} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,{
    //   username, password, fullName, phoneNumber, avatarURL,
    // });

    const response = await fetch(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        fullName : form.fullName,       
        phoneNumber,
        avatarURL,
      })
    })

    if (response.ok) {
      const data = await response.json();
      const { token, userId, hashedPassword, fullName } = data;
      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);

      if (isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }

      window.location.reload();
    } else {
      console.error('Request failed', response.statusText);
      setIncorrect(true);
    }



    // cookies.set('token', token);
    // cookies.set('username', username);
    // cookies.set('fullName', fullName);
    // cookies.set('userId', userId);

    // if (isSignup) {
    //   cookies.set('phoneNumber', phoneNumber);
    //   cookies.set('avatarURL', avatarURL);
    //   cookies.set('hashedPassword', hasedPassword);
    // }

    // window.location.reload();
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <img src={chaticon} alt="" height="150" width="150" />
        <span className='museomoderno-appname' style={{ color: 'white',fontSize : '30px' }}>SPEAK EASY</span>
        <br />
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input type="text"
                  name='fullName'
                  placeholder='Enter your Full Name'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input type="text"
                name='username'
                placeholder='Enter your Username'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel"
                  name='phoneNumber'
                  placeholder='Enter your Phone no.'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Profile Picture URL (optional) </label>
                <input type="text"
                  name='avatarURL'
                  placeholder='Enter Profile Picture URL'
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input type='password'
                name='password'
                placeholder='Enter Password'
                onChange={handleChange}
                required
                autoComplete='on'
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  onChange={handleChange}
                  required
                  autoComplete='on'
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
            <br />
            {!isSignup && (incorrect && (
              <div style={{ color: 'red' }}>
                Incorrect Password or Username <ExclamationCircleOutlined style={{ color: 'red' }} />
              </div>
            ))}
          </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup ? 'Already have an account? ' : "Don't have an account?"}
            </p>
            <span onClick={switchMode}>
              &nbsp;
              {isSignup ? 'Sign In' : 'Sign Up'}
            </span>
          </div>
        </div>
        <div>
          <p style={{ color: 'white' }}>Connect Effortlessly, Speak Freely.</p>
        </div>
      </div>
    </div>
  )
}

export default Auth;

