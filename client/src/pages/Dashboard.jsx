import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import TeamsList from '../components/MyTeams'

import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';

export default function Dashboard() {

    const loggedIn = Auth.loggedIn();
    const userName = loggedIn ? Auth.getProfile().data?.name : '';
    const email = loggedIn ? Auth.getProfile().data?.email : '';


    const { profileId } = useParams();

    // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
    const { loading, data } = useQuery(
        profileId ? QUERY_PROFILE : QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );

    // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
    const profile = data?.me || data?.profile || {};

    return (

        <div>
            <h2>Dashboard</h2>
            {loggedIn ? (
                <div>
                    <div>
                        <h3>User Information</h3>
                        <p>Username: {userName}</p>
                        <p>Email: {email}</p>
                    </div>

                    <div>
                        <h3>My Teams</h3>
                        <div>
                            {profile ? (
                                <TeamsList
                                    teams={profile.teams || []}
                                    isLoggedInUser={!profileId}
                                />
                            ) : (
                                <p>Loading profile data...</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (<p>Please log in or sign up!</p>)}
        </div>
    );
}