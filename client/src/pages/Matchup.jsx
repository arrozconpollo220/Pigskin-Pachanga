import Auth from '../utils/auth';

export default function Matchup() {

  const loggedIn = Auth.loggedIn();

  return (
    <div>
      <h2>MATCH UP</h2>
      {loggedIn ? (
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque
            velit, lobortis ut magna varius, blandit rhoncus sem. Morbi lacinia nisi
            ac dui fermentum, sed luctus urna tincidunt. Etiam
          </p>
        </div>
      ) : (
        <p>Please log in or sign up!</p>
      )}
      </div>
  );
}