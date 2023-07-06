import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };
  let navigate = useNavigate();

  return (
    <div className='login-container'>
      <div className='welcome'>
        <h2 className='welcome-subtitle'>Welcome</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label className='form-group-label'>Username</label>
            <input className='form-group-input' type='text' {...register("username", { required: true })}/>
            {errors.username && <p className="form-error"> <BiError/>Please check your username or password</p>}
          </div>
          <div className='form-group'>
            <label className='form-group-label'>Password</label>
            <input className='form-group-input'type='password' {...register("password", { required: true, minLength: 8, pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  })} />
            {errors.password && <p className="form-error"> <BiError/> Please check your username or password</p>}
          </div>
          <button className='login-button' type='submit'>Login</button>
        </form>
      </div>
      <input type='button' value='Go Back' className='back-btn' onClick={()=>{navigate('/')}}/>
    </div>
  )
}

export default Login


