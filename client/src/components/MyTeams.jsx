import { useMutation } from '@apollo/client';

import { REMOVE_TEAM } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const TeamsList = ({ teams, isLoggedInUser = false }) => {
    const [removeTeam, { error }] = useMutation(REMOVE_TEAM, {
        refetchQueries: [
            { query: QUERY_ME },
        ],
    });

    const handleRemoveTeam = async (teamId) => {
        try {
            const { data } = await removeTeam({
                variables: { teamId },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (!teams.length) {
        return <h4>No Teams Yet!</h4>;
    }

    return (
        <div>
            <div className="flex-row justify-space-between my-4">
                {teams.map((team) => (
                    <div key={team._id} className="col-12 col-xl-6">
                        <div className="card mb-3">
                            <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                                <span>{team.name}</span>
                                {isLoggedInUser && (
                                    <button
                                        className="btn btn-sm btn-danger ml-auto"
                                        onClick={() => handleRemoveTeam(team._id)}
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

export default TeamsList;