import { gql } from '@apollo/client';

export const ADD_NEW_LEAGUE = gql`
    mutation addLeague($name: String!, $commissioner: String!) {
        addLeague(name: $name, commissioner: $commissioner) {
            _id
            name
            commissioner
        }
    }
`;


export const REMOVE_LEAGUE = gql`
    mutation removeLeague($leagueId: ID!) {
        removeLeague(leagueId: $leagueId) {
            _id
        }
    }
`;

export const UPDATE_LEAGUE = gql`
    mutation updateLeague($leagueId: ID!, $name: String!, $commissioner: String!) {
        updateLeague(leagueId: $leagueId, name: $name, commissioner: $commissioner) {
            _id
            name
            commissioner
        }
    }
`;

export const ADD_NEW_TEAM = gql`
    mutation addNewTeam($name: String!) {
        addTeam(name: $name) {
            _id
            name
            players {
                _id
                name
                pos
                nflTeam
                playerId
            }
        }
    }
`;

export const REMOVE_TEAM = gql`
    mutation removeTeam($teamId: ID!) {
        removeTeam(teamId: $teamId) {
            _id
        }
    }
`;

export const UPDATE_TEAM = gql`
    mutation removeTeam($teamId: ID!) {
        removeTeam(teamId: $teamId) {
            _id
        }
    }
`;

export const REMOVE_TEAM_FROM_LEAGUE = gql`
    mutation removeTeamFromLeague($leagueId: ID!, $teamId: ID!) {
        removeTeamFromLeague(leagueId: $leagueId, teamId: $teamId) {
            _id
        }
    }
`;

export const ADD_TEAM_TO_LEAGUE = gql`
    mutation addTeamToLeague($leagueId: ID!, $teamId: ID!) {
        addTeamToLeague(leagueId: $leagueId, teamId: $teamId) {
            _id
        }
    }
`;

export const ADD_PLAYER_TO_TEAM = gql`
    mutation addPlayerToTeam($teamId: ID!, $playerId: ID!) {
        addPlayerToTeam(teamId: $teamId, playerId: $playerId) {
            _id
        }
    }
`;

export const REMOVE_PLAYER_FROM_TEAM = gql`
    mutation removePlayerFromTeam($teamId: ID!, $playerId: ID!) {
        removePlayerFromTeam(teamId: $teamId, playerId: $playerId) {
            _id
        }
    }
`;

export const ADD_PROFILE = gql`
    mutation addProfile($name: String!, $email: String!, $password: String!) {
        addProfile(name: $name, email: $email, password: $password) {
            token
            profile {
                _id
                name
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token    
        profile {
                _id
                email
                name
            }
    }
}
`;

export const CREATE_NEW_TEAM_IN_LEAGUE = gql`
    mutation createNewTeamInLeague($leagueId: ID!, $teamName: String!) {
        createNewTeamInLeague(leagueId: $leagueId, teamName: $teamName) {
            _id
            name
            commissioner
            teams {
                _id
                name
                owner {
                    _id
                    name
                }
            }
        }
    }
`;

