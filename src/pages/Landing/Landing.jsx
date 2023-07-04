
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  let navigate = useNavigate();

  return (
    <div>
      <button onClick={()=>{navigate('/login')}}>Sign In</button>
    </div>
  )
}

export default Landing