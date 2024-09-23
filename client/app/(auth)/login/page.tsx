import React from 'react';

export default function Login() {
  return (
    <section className='home'>
      <div className='form_container'>
        <div className='form login_form'>
          <form action='#'>
            <h2>Login</h2>

            <div className='input_box'>
              <input type='email' placeholder='Enter your email' required />
              <i className='uil uil-envelope-alt email'></i>
            </div>
            <div className='input_box'>
              <input
                type='password'
                placeholder='Enter your password'
                required
              />
              <i className='uil uil-lock password'></i>
              <i className='uil uil-eye-slash pw_hide'></i>
            </div>

            <div className='option_field'>
              <span className='checkbox'>
                <input type='checkbox' id='check' />
                <label htmlFor='check'>Remember me</label>
              </span>
              <a href='#' className='forgot_pw'>
                Forgot password?
              </a>
            </div>

            <button className='button'>Login Now</button>

            <div className='login_signup'>
              {` Don't have an account?`}
              <a href='#' id='signup'>
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
