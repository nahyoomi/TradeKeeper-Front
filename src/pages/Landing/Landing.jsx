
import { useNavigate } from 'react-router-dom';
import './Landing.scss'
const Landing = () => {
  let navigate = useNavigate();

  return (
    <div className='landing-page'>
      <div className='container'>
      <h1 className='landing-page-title'>Welcome to Trade Keeper</h1>
      <img className="landing-page-image" src='https://media.gcflearnfree.org/content/55e0730c7dd48174331f5164_01_17_2014/whatisacomputer_pc.jpg' alt='Banner'/>
      <p  className='landing-page-resume'>
        Trade Keeper is a comprehensive software solution designed for managing
        trade operations and inventory. It provides powerful features to help
        businesses streamline their processes, track products, and enhance
        efficiency.
      </p>
      <p className='landing-page-resume'>Please sign in to continue.</p>
      <button className='landing-page-btn' onClick={()=>{navigate('/login')}}>Sign In</button>
    </div>
    </div>
  )
}
export default Landing