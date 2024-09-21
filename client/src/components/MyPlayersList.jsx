import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_PLAYER_FROM_TEAM } from '../utils/mutations'
import { QUERY_TEAM } from '../utils/queries'

const MyPlayersList = ({ teamId }) => {
    const {loading, data, error: queryError} = useQuery(QUERY_TEAM, {
        variables: {teamId}
    })

    const [removePlayer, { error: mutationError }] = useMutation(REMOVE_PLAYER_FROM_TEAM, {
        refetchQueries: [
            { 
                query: QUERY_TEAM,
                variables: {teamId}, 
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

    if (!players.length) {
        return <h4>No Players Drafted!</h4>;
    }

    return (
        <div>
            <div className="">
                {players.map((player) => (
                    <div key={player._id} className="">
                        <div className="card">
                            <h4 className="card-header display-flex align-center">
                                <span>{player.name}     </span>
                                {(
                                    <button
                                        className="btn btn-sm btn-danger ml-auto"
                                        onClick={() => handleRemovePlayer(player._id)}
                                    >
                                        X
                                    </button>
                                )}
                            </h4>
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