import './Login.scss';

const Login = () => {
  return (
    <div className='login_container'>
      <div className='welcome'>
        <h2 className='welcome_subtitle'>Welcome</h2>
        <form>
          <div className='form_group'>
            <label className='form_group_label'>Username</label>
            <input className='form_group_input' type='text' id='username'/>
          </div>
          <div className='form_group'>
            <label className='form_group_label'>Password</label>
            <input className='form_group_input'type='password' id='password' />
          </div>
          <button className='login_button' type='submit'>Login</button>
          <div className='options'>
            <p className='options_selection'>Did you lose your password?</p>
            <p className='options_selection'>You don´t have an account?</p>
          </div>
        </form>
      </div>
      <input type='button' value='Go Back' className='back_btn'/>
    </div>
  )
}

export default Login
