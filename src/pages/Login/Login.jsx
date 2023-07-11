import { authUser } from '../../services/Users/UserServices' 
import { setToken } from '../../redux/global/globalSlider'
import { useDispatch } from "react-redux" 
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { BiError } from "react-icons/bi"
import Swal from 'sweetalert'
import './Login.scss' 
 
const Login = () => { 
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
 
  const onSubmit = async (data) => {
    try {
      const res = await authUser(data);
      if (res.status === 200) {
        console.log(res);
        dispatch(setToken(res.data.token));
        navigate('/dashboard');
      }
    } catch (error) {
      handleUserNotRegisteredError(error);
    }
  };
  
  const handleUserNotRegisteredError = (error) => {
    console.log("User not registered ", error);
    Swal({
      text: 'User not registered, please contact your Admin',
      buttons: {
        confirm: 'Understand',
      },
    });
  };
/*   const onSubmit = (data) => { 
    authUser(data) 
    .then((res) => { 
      if(res.status === 200){ 
        console.log(res); 
        dispatch(setToken(res.data.token)); 
        navigate('/dashboard'); 
      }  
    }) 
    .catch((error) => { 
      console.log("User not registered ", error); 
      Swal({ 
        text: 'User not registered, please contact your Admin', 
        buttons: { 
          confirm: 'Understand', 
        }, 
      }) 
    }); 
  };  */
 
  return ( 
    <div className='login-container'> 
      <div className='welcome'> 
        <h2 className='welcome-subtitle'>Welcome</h2> 
        <form onSubmit={handleSubmit(onSubmit)}> 
          <div className='form-group'> 
            <label className='form-group-label'>Username</label> 
            <input className='form-group-input' type='text' {...register("username", { required: true })} autoComplete="username"/> 
            {errors.username && <p className="form-error"><BiError/> Please check your username or password</p>} 
          </div> 
          <div className='form-group'> 
            <label className='form-group-label'>Password </label> 
            <input className='form-group-input' type='password' {...register("password", { required: true, minLength: 8, pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  })} autoComplete='current-password'/> 
            {errors.password && <p className="form-error"><BiError/> Please check your username or password</p>} 
          </div> 
          <button className='login-button' type='submit'>Login</button> 
        </form> 
      </div> 
      <input type='button' value='Go Back' className='back-btn' onClick={()=>{navigate('/')}} /> 
    </div> 
  ) 
} 
 
export default Login