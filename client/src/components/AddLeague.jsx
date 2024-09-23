import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_NEW_LEAGUE } from '../utils/mutations'

const AddLeague = ({ userId }) => {
    const [formState, setFormState] = useState({
        leagueName: '',
    });

    const [addLeague, { error, data }] = useMutation(ADD_NEW_LEAGUE);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState);
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const token = Auth.getToken();
        
        try {
            const { data } = await addLeague({
                variables: {
                    name: formState.leagueName,
                    commissioner: userId,
                },
                context: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });
    
            setFormState({
                leagueName: '',
            });
    
        } catch (err) {
            console.error("Error creating league:", err);
        }

        window.location.reload();
    };

    return (
        <main>
            <div>
                <div className="titleContainer">
                    <h4 className="card-header p-2">Add a new league</h4>
                </div>
                <div>
                    {data ? (
                        <p>Success! Your league will now appear on your dashboard!</p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>

                            <div className='inputContainer'>
                                <input
                                    className="inputBox"
                                    placeholder="Your league name"
                                    name="leagueName"
                                    type="text"
                                    value={formState.leagueName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='inputContainer'>
                                <button
                                    className="inputButton"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}

                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AddLeague;