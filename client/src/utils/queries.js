import { gql } from '@apollo/client';

export const QUERY_LEAGUES = gql`
    query Leagues {
    leagues {
        _id
        commissioner
        name
    }
}
`;

export const QUERY_TEAMS = gql`
    query getTeams {
        teams {
            _id
            name
            owner
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

export const QUERY_TEAMS_BY_OWNER = gql`
    query TeamsByOwner($ownerId: ID!) {
        teamsByOwner(ownerId: $ownerId) {
            _id
            name
            owner {
                _id
                name
            }
        }
    }
`

export const QUERY_PLAYERS = gql`
    query Players {
        players {
            _id
            name
            nflTeam
            playerId
            pos
        }
    }
`;

export const QUERY_PROFILES = gql`
    query getProfiles {
        profiles {
            _id
            name
            email
            teams {
                _id
                name
                owner
            }
        }
    }
`;

export const QUERY_PROFILE = gql`
    query getProfile($profileId: ID!) {
        profile(profileId: $profileId) {
            _id
            name
            email
            teams {
                _id
                name
                owner
            }
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            name
            skills
        }
    }
`;

export const QUERY_PLAYER = gql`
    query getPlayer($playerId: ID!) {
        player(playerId: $playerId) {
            _id
            name
            playerId
            pos
            nflTeam
            team {
                _id
                name
                owner
            }
        }
    }
`;

export const QUERY_TEAM = gql`
    query getTeam($teamId: ID!) {
        team(teamId: $teamId) {
            _id
            name
            owner
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

export const QUERY_LEAGUE = gql`
    query getLeague($leagueId: ID!) {
        league(leagueId: $leagueId) {
            _id
            name
            commissioner
            teams {
                _id
                name
                owner
            }
        }
    }
`;

export const QUERY_AUTH = gql`
    query getAuth {
        auth {
            token
            profile {
                _id
                name
                email
                teams {
                    _id
                    name
                }
            }
        }
    }
`;