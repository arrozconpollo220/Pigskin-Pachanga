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

        <div className='coming-soon'>
          <video autoPlay muted className='Coming-vid' style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '25%',
            height: '25%',
            objectFit: 'cover',
            zIndex: 1,
            opacity: 0.7,
          }}>
            <source src={ComingSoon} type='video/mp4' />
          </video>
        </div>

    </div>
  );
}