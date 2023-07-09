
import { useNavigate } from 'react-router-dom';
import Banner from '../../assets/Images/banner.png';
import './Landing.scss'

const Landing = () => {
  let navigate = useNavigate();

  return (
    <div className="landing-container">
    <div className="hero-section">
      <h1 className="title">TradeKeeper</h1>
      <p className="description">The definitive software to manage your financial operations.</p>
      <button className="sign-in-button"  onClick={()=>{navigate('/login')}}>Log in</button>
    </div>
    <div className="features-section">
      <div className="feature">
        <img src={Banner} alt="Benefit 1" className="feature-image" />
        <h2 className="feature-title">Simplified management</h2>
        <p className="feature-description">TradeKeeper allows you to keep a detailed record of all your financial operations in one place, facilitating the management and organization of your investments.</p>
      </div>
      <div className="feature">
        <img src={Banner} alt="Benefit 2" className="feature-image" />
        <h2 className="feature-title">Full reports</h2>
        <p className="feature-description">Get detailed and accurate reports on your profits, losses and overall investment performance. Make informed decisions based on real data.</p>
      </div>
      <div className="feature">
        <img src={Banner} alt="Benefit 3" className="feature-image" />
        <h2 className="feature-title">Custom alerts</h2>
        <p className="feature-description">Set custom alerts to receive notifications about important changes in your operations or in the financial market. Never miss an opportunity.</p>
      </div>
    </div>
    <div className="interactive-section">
      <h2 className="interactive-title">Find out how TradeKeeper can help you improve your investments</h2>
      <form className="contact-form">
        <input type="text" placeholder="Name" className="input-field" />
        <input type="email" placeholder="Email Address" className="input-field" />
        <button type="submit" className="contact-button">I want to know more!</button>
      </form>
    </div>
  </div>
);
};
export default Landing