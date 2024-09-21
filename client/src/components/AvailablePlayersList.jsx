import { useQuery, useMutation } from '@apollo/client';
import { ADD_PLAYER_TO_TEAM } from '../utils/mutations'
import { QUERY_PLAYERS, QUERY_TEAM } from '../utils/queries'

const AvailablePlayersList = ({ teamId }) => {

    const [addPlayerToTeam, { error: mutationError }] = useMutation(ADD_PLAYER_TO_TEAM, {
        refetchQueries: [
            {
                query: QUERY_TEAM,
                variables: { teamId },
            },
            {
                query: QUERY_PLAYERS
            },
        ],
});
    const { loading, data: playersData } = useQuery(QUERY_PLAYERS);

    const players = playersData?.players || [];

    if (loading) {
        return <p>Loading players...</p>;
    }

    const handleDraftPlayer = async (playerId) => {
        try {
            await addPlayerToTeam({
                variables: {
                    teamId,
                    playerId,
                }
            });
        } catch (error) {
            console.error('An error occurred while drafting player!', error)
        }
    };

    return (
        <div>
            <h3>Available Players will be listed here!</h3>
            {players.map((player) => (
                <div key={player._id}>
                    <div>
                        <p>{player.name}</p>
                    </div>

                    <div>
                        <button
                            onClick={() => handleDraftPlayer(player._id)}
                        >DRAFT!</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AvailablePlayersList;