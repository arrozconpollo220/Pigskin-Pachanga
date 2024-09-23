import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_PLAYER_FROM_TEAM } from '../utils/mutations'
import { QUERY_TEAM } from '../utils/queries'
import { FaTrash } from 'react-icons/fa';

const MyPlayersList = ({ teamId }) => {
    const { loading, data, error: queryError } = useQuery(QUERY_TEAM, {
        variables: { teamId },
        skip: !teamId,
    })

    const [removePlayer, { error: mutationError }] = useMutation(REMOVE_PLAYER_FROM_TEAM, {
        refetchQueries: [
            {
                query: QUERY_TEAM,
                variables: { teamId },
            },
        ],
    });

    const handleRemovePlayer = async (playerId) => {
        try {
            await removePlayer({
                variables: { teamId, playerId },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (queryError) return <p>Error loading team data.</p>;

    const players = data?.team?.players || [];

    if (teamId === '') {
        return (
            <div>
                <h3 className='bg-light text-dark'>My Players</h3>
                <h4>Please select a team to view the players!</h4>
            </div>
        )
    }

    if (!players.length) {
        return <h4>No Players Drafted!</h4>;
    }

    return (
        <div>
            <div>
                <h3 className='bg-light text-dark'>My Players</h3>
                {players.map((player) => (
                    <div key={player._id}>
                        <div className="card">
                            <p className="card-header">
                                <span className="bg-dark text-white d-inline-block" style={{ width: '15%' }}>{player.nflTeam}     </span>
                                <span className="bg-white text-black d-inline-block" style={{ width: '60%' }}>{player.name}     </span>
                                <span className="bg-dark text-white d-inline-block" style={{ width: '15%' }}>{player.pos}     </span>
                                <span style={{ width: '10%' }}>
                                    <button
                                        className="btn btn-sm btn-danger ml-auto d-inline-block"
                                        style={{ marginBottom: "4px", marginLeft: '5px' }}
                                        onClick={() => handleRemovePlayer(player._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {(mutationError || queryError) && (
                <div className="my-3 p-3 bg-danger text-white">{mutationError?.message || queryError?.message}</div>
            )}
        </div>
    );
}

export default MyPlayersList;