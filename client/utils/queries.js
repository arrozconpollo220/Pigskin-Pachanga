import { gql } from '@apollo/client';

export const QUERY_LEAGUES = gql`
    query getLeagues {
        leagues {
            _id
            name
            commissioner
            teams {
                _id
                name
            }
        }
    }
`;  

export const QUERY_TEAMS = gql`
    query getTeams {
        teams {
            _id
            name
            players {
                _id
                name
            }
        }
    }
`;

export const QUERY_PLAYERS = gql`
    query getPlayers {
        players {
            _id
            name
            team {
                _id
                name
            }
        }
    }
`;

export const QUERY_PROFILES = gql`
    query getProfiles {
        profiles {
            _id
            name
            teams
        }
    }
`;