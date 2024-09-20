import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import TeamsList from '../components/MyTeams'

import { QUERY_TEAMS_BY_OWNER } from '../utils/queries';

export default function Dashboard() {

    const loggedIn = Auth.loggedIn();
    const userId = loggedIn ? Auth.getProfile().data?._id : '';
    const userName = loggedIn ? Auth.getProfile().data?.name : '';
    const email = loggedIn ? Auth.getProfile().data?.email : '';

    // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
    const { loading, data } = useQuery(QUERY_TEAMS_BY_OWNER, {
        variables: { ownerId: userId },
        skip: !userId,
    });

    const teams = data?.teamsByOwner || [];

    return (

        <div>
            <h2>Dashboard</h2>
            {loggedIn ? (
                <div>
                    <div className="container">
                        <h3>User Information</h3>
                        <p>Username: {userName}</p>
                        <p>Email: {email}</p>
                    </div>

                    <div>
                        <h3>My Teams</h3>
                        <div>
                            {loading ? (
                                <p>Loading teams...</p>
                            ) : (
                                <TeamsList
                                    teams={teams || []}
                                    isLoggedInUser={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (<p>Please log in or sign up!</p>)}
        </div>
    );
}