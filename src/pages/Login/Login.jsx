import './Login.scss';
/* import { useForm } from "react-hook-form"; */

const Login = () => {
/*   const { register, handleSubmit, errors } = useForm();
  const onSubmit = null;  */

  return (
    <div className='login-container'>
      <div className='welcome'>
        <h2 className='welcome-subtitle'>Welcome</h2>
        <form /* onSubmit={handleSubmit(onSubmit)} */>
          <div className='form-group'>
            <label className='form-group-label' name='username' /* ref={register({ required: true })} */>Username</label>
           {/*  {errors.username && <span className='error_message'>Username is required</span>} */}
            <input className='form-group-input' type='text' id='username' name='password' /* ref={register({ required: true })} *//>
          </div>
          <div className='form-group'>
            <label className='form-group-label'>Password</label>
           {/*  {errors.password && <span className='error_message'>Password is required</span>} */}
            <input className='form-group-input'type='password' id='password' />
          </div>
          <button className='login-button' type='submit'>Login</button>
          <div className='options'>
            <p className='options-selection'>Did you lose your password?</p>
            <p className='options-selection'>You don´t have an account?</p>
          </div>
        </form>
      </div>
      <input type='button' value='Go Back' className='back-btn'/>
    </div>
  )
}

export default Login


