import Auth from '../utils/auth';
import ComingSoon from '/comingsoon.mp4';
import '../styles/Matchup.css';

export default function Matchup() {
  const loggedIn = Auth.loggedIn();

  return (
    <div>
      <div>
        <h2>MATCH UP</h2>
      </div>

      <div className='coming-soon' style={{height: '300px', borderRadius: '50px',}}>
        <video 
          className='coming-soon-video' 
          autoPlay 
          loop 
          muted
          src={ComingSoon}
          style= {{
            height: '400px',
            borderRadius: '50px',
            opacity: 0.5,
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
