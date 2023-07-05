
import { useNavigate } from 'react-router-dom';
import './Landing.scss'
const Landing = () => {
  let navigate = useNavigate();

  return (
    <div className='landing-page'>
      <h1 className='landing-page-title'>Welcome to Trade Keeper</h1>
      <img className="landing-page-image" src='/' alt='Banner'/>
      <p  className='landing-page-resume'>
        Trade Keeper is a comprehensive software solution designed for managing
        trade operations and inventory. It provides powerful features to help
        businesses streamline their processes, track products, and enhance
        efficiency.
      </p>
      <p className='landing-page-resume'>Please sign in to continue.</p>
      <button className='landing-page-btn' onClick={()=>{navigate('/login')}}>Sign In</button>
    </div>
  )
}
export default Landing