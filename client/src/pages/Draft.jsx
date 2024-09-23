import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_TEAMS_BY_OWNER } from '../utils/queries';
import AvailablePlayersList from '../components/AvailablePlayersList';
import MyPlayersList from '../components/MyPlayersList';

export default function Draft() {

  const loggedIn = Auth.loggedIn();
  const userId = loggedIn ? Auth.getProfile().data?._id : '';

  const [formState, setFormState] = useState({
    teamId: '',
  });

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
    <div style={{width: "75%"}}>
      <h2>DRAFT</h2>
      {loggedIn ? (
        <div>
          <div className="container">
            <h3>Welcome to the Draft!</h3>
          </div>

          <div id="myplayerslist">
            <MyPlayersList teamId={formState.teamId} />
          </div>

          <div id="teamSelect">
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

        </div>
      ) : (
        <p>Please log in or sign up!</p>
      )}
    </div>
  );
}