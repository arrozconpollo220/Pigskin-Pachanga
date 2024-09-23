import { useQuery, useMutation } from '@apollo/client';
import { ADD_PLAYER_TO_TEAM } from '../utils/mutations'
import { QUERY_PLAYERS, QUERY_TEAM } from '../utils/queries'
import React, { useState } from 'react';
import Select from 'react-select';

const AvailablePlayersList = ({ teamId }) => {
    const [addPlayerToTeam] = useMutation(ADD_PLAYER_TO_TEAM, {
        refetchQueries: [
            { query: QUERY_TEAM, variables: { teamId } },
            { query: QUERY_PLAYERS },
        ],
    });
    const { loading, data: playersData } = useQuery(QUERY_PLAYERS);
    const players = playersData?.players || [];

    const [selectedPlayer, setSelectedPlayer] = useState(null);

    if (loading) {
        return <p>Loading players...</p>;
    }

    const handleDraftPlayer = async () => {
        if (selectedPlayer) {
            try {
                await addPlayerToTeam({
                    variables: {
                        teamId,
                        playerId: selectedPlayer.value,
                    },
                });
                setSelectedPlayer(null); // Clear selection after drafting
            } catch (error) {
                console.error('An error occurred while drafting player!', error);
            }
        }
    };

    // Create an array of options for the Select component
    const options = players.map((player) => ({
        value: player._id,
        label: player.name,
    }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            color: 'black', 
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'black', 
            backgroundColor: state.isFocused ? '#b7253d' : 'white', 
            textDecoration: state.isSelected ? 'underline' : 'none',
            fontSize: state.isSelected ? '24px' : '16px',
            
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };

    return (
        <div style={{ paddingBottom: '30px', marginTop: '30px' }}>
            <h3>Select a Player to Draft</h3>
            <Select
                options={options}
                styles={customStyles} 
                onChange={setSelectedPlayer}
                placeholder="Type to search for a player..."
                isClearable
                isSearchable
                maxMenuHeight={140}
            />
            <button onClick={handleDraftPlayer} disabled={!selectedPlayer}>
                DRAFT!
            </button>
        </div>


    );
};

export default AvailablePlayersList;