import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_TEAMS_BY_OWNER } from '../utils/queries';
import AvailablePlayersList from '../components/AvailablePlayersList';
import MyPlayersList from '../components/MyPlayersList';

export default function Draft() {

  const loggedIn = Auth.loggedIn();
  const userId = loggedIn ? Auth.getProfile().data?._id : '';
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [formState, setFormState] = useState({
    teamId: '',
  });

  useEffect(() => {
    const handleOnline = () => {
      console.log('Back online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('You are offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_TEAMS_BY_OWNER, {
    variables: { ownerId: userId },
    skip: !userId,
  });

  const teams = data?.teamsByOwner || [];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('Form state updated:', formState);
  }, [formState]);

  return (
    <div style={{ width: '25%' }}>
      <div>
        <h2>DRAFT</h2>
      </div>

      {isOnline ? (
        <div>
          {loggedIn ? (
            <div>
              <div className="container">
                <h3>Welcome to the Draft!</h3>
              </div>

              <div id="teamSelect" style={{ marginTop: '30px' }}>
                <h4>Select a team to draft players...</h4>
                <form>
                  <select
                    className="inputBox"
                    name="teamId"
                    value={formState.teamId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a team</option>
                    {loading ? (
                      <option>Loading teams...</option>
                    ) : (
                      teams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      ))
                    )}
                  </select>
                </form>
              </div>

              <div id="playerlist">
                <AvailablePlayersList teamId={formState.teamId} />
              </div>


              <div id="myplayerslist">
                <MyPlayersList teamId={formState.teamId} />
              </div>

            </div>
          ) : (
            <p>Please log in or sign up!</p>
          )}
        </div>
      ) : (
        <div className="col-12 col-lg-10" style={{ padding: '10px', width: '300px' }}>
          <h3>You are offline!</h3>
          <img src='/referee.png' alt='A picture of a referee' style={{ width: '100%' }} />
          <p>This feature is only available while connected to the internet.</p>
          <p>Try again in a few moments!</p>
        </div>
      )}

    </div>
  );
}