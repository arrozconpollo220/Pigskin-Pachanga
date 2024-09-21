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
                            <h4 className="card-header display-flex align-center">
                                <span>{league.name}     </span>
                                {isLoggedInUser && (
                                    <button
                                        className="btn btn-sm btn-danger ml-auto"
                                        onClick={() => handleRemoveLeague(league._id)}
                                    >
                                        X
                                    </button>
                                )}
                            </h4>
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