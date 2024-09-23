import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
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
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    if (!teams.length) {
        return <h4>No Teams Yet!</h4>;
    }

    return (
        <div>
            <div className="">
                {teams.map((team) => (
                    <div key={team._id} className="">
                        <div className="card">
                            <p className="card-header display-flex align-center">
                                <span className="bg-white text-black d-inline-block" style={{ width: '90%' }}>{team.name}</span>
                                {isLoggedInUser && (
                                    <span style={{width: '10%'}}>
                                        <button
                                            className="btn btn-sm btn-danger ml-auto"
                                            style={{ marginBottom: "4px", marginLeft: '5px' }}
                                            onClick={() => handleRemoveTeam(team._id)}
                                        >
                                            <FaTrash />
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

export default TeamsList;