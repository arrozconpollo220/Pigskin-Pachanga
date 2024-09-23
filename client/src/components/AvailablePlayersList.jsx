import { useQuery, useMutation } from '@apollo/client';
import { ADD_PLAYER_TO_TEAM } from '../utils/mutations'
import { QUERY_PLAYERS, QUERY_TEAM } from '../utils/queries'
import { FaThumbsUp } from 'react-icons/fa';

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
    const { loading, data: playersData } = useQuery(QUERY_PLAYERS)
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
            <h3 className='bg-light text-dark'>Available Players</h3>
            {players.map((player) => (
                <div key={player._id}>
                    <div className="card">
                        <p className="card-header">
                            <span className="bg-dark text-white d-inline-block" style={{ width: '15%' }}>{player.nflTeam}     </span>
                            <span className="bg-white text-black d-inline-block" style={{ width: '60%' }}>{player.name}     </span>
                            <span className="bg-dark text-white d-inline-block" style={{ width: '15%' }}>{player.pos}     </span>
                            <span style={{ width: '10%' }}>
                                <button
                                    className="btn btn-sm btn-success ml-auto d-inline-block"
                                    style={{ marginBottom: "4px", marginLeft: '5px' }}
                                    onClick={() => handleDraftPlayer(player._id)}
                                ><FaThumbsUp />
                                </button>
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AvailablePlayersList;