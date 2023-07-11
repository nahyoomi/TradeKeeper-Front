import { useNavigate } from 'react-router-dom'
import SimplifiedManagement from '../../assets/Images/SimplifiedManagement.png'
import FullReports from '../../assets/Images/FullReports.png'
import CustomAlerts from '../../assets/Images/CustomAlerts.png'
import './Landing.scss'

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="title">TradeKeeper</h1>
        <p className="description">The definitive software to manage your financial operations.</p>
        <button className="sign-in-button" onClick={() => { navigate('/login') }}>Login</button>
      </div>
      <div className="features-section">
        <div className="feature">
          <img src={SimplifiedManagement} alt="Benefit 1" className="feature-image" />
          <h2 className="feature-title">Simplified Management</h2>
          <p className="feature-description">TradeKeeper allows you to keep a detailed record of all your financial operations in one place, facilitating the management and organization of your investments.</p>
        </div>
        <div className="feature">
          <img src={FullReports} alt="Benefit 2" className="feature-image" />
          <h2 className="feature-title">Full Reports</h2>
          <p className="feature-description">Get detailed and accurate reports on your profits, losses, and overall investment performance. Make informed decisions based on real data.</p>
        </div>
        <div className="feature">
          <img src={CustomAlerts} alt="Benefit 3" className="feature-image" />
          <h2 className="feature-title">Custom Alerts</h2>
          <p className="feature-description">Set custom alerts to receive notifications about important changes in your operations or in the financial market. Never miss an opportunity.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;