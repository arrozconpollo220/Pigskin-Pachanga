import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { CREATE_NEW_TEAM_IN_LEAGUE } from '../utils/mutations'
import { QUERY_LEAGUES } from '../utils/queries'

const AddTeam = () => {
    const [formState, setFormState] = useState({
        league: '',
        name: '',
    });

    const [Team, { error, data }] = useMutation(CREATE_NEW_TEAM_IN_LEAGUE);
    const { loading, data: leaguesData } = useQuery(QUERY_LEAGUES);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState);
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const token = Auth.getToken();
        
        try {
            const { data } = await Team({
                variables: {
                    leagueId: formState.league,
                    teamName: formState.name,
                },
                context: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });
    
            setFormState({
                league: '',
                name: '',
            });
    
        } catch (err) {
            console.error("Error creating team:", err);
        }

        window.location.reload();
    };

    return (
        <main>
            <div>
                <div className="titleContainer">
                    <h4 className="card-header p-2">Add a new team</h4>
                </div>
                <div>
                    {data ? (
                        <p>Success! Your team will now appear on your dashboard!</p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <select
                                    className="inputBox"
                                    placeholder='Select league'
                                    name="league"
                                    value={formState.league}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select a league</option>
                                    {leaguesData?.leagues.map((league) => (
                                        <option key={league._id} value={league._id}>
                                            {league.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='inputContainer'>
                                <input
                                    className="inputBox"
                                    placeholder="Your team name"
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='inputContainer'>
                                <button
                                    className="inputButton"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}

                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AddTeam;