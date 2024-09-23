import { useMutation } from '@apollo/client';
import { REMOVE_LEAGUE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const LeaguesList = ({ leagues, isLoggedInUser = false }) => {
    const [removeLeague, { error }] = useMutation(REMOVE_LEAGUE, {
        refetchQueries: [
            { query: QUERY_ME },
        ],
    });

    const handleRemoveLeague = async (leagueId) => {
        try {
            await removeLeague({
                variables: { leagueId },
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    if (!leagues.length) {
        return <h4>No Leagues Created!</h4>;
    }

    return (
        <div>
            <div className="">
                {leagues.map((league) => (
                    <div key={league._id} className="">
                        <div className="card">
                            <p className="card-header display-flex align-center">
                                <span className="bg-white text-black d-inline-block" style={{ width: '90%' }}>{league.name}</span>
                                {isLoggedInUser && (
                                    <span style={{width: '10%'}}>
                                        <button
                                            className="btn btn-sm btn-danger ml-auto"
                                            style={{ marginBottom: "4px", marginLeft: '5px' }}
                                            onClick={() => handleRemoveLeague(league._id)}
                                        >
                                            X
                                        </button>
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {error && (
                <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
        </div>
    );
};

export default LeaguesList;