import React, { useState, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';
import { SearchOutlined } from '@ant-design/icons';
import ResultsDropdown from './ResultsDropdown';
// import searchIcon from '../assets/searchicon.png';

const ChannelSearch = ({setToggleContainer}) => {
    const { client, setActiveChannel} = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {
        if (!query){
            setTeamChannels([]);
            setDirectChannels([]);
        }
    },[query]);

    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({
                type : 'team',
                name : {$autocomplete : text},
                members : { $in : [client.userID]}
            })

            const userReponse = client.queryUsers({
                id : { $ne : client.userID},
                name : { $autocomplete : text }
            })

            const [channels, users] = await Promise.all([channelResponse, userReponse]);

            if (channels.length) setTeamChannels(channels);
            if (users.length) setDirectChannels(users);

        } catch (error) {
            setQuery('');
        }
    }

    const onSearch = (event) =>{
        event.preventDefault();
        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
    }

    const setChannel = (channel) =>{
        setQuery('');
        setActiveChannel(channel);
    }

    return (
        <div className='channel-search__container'>
            <div className='channel-search__input__wrapper'>
                <div className='channel-search__input__icon'>
                    <SearchOutlined style={{color : 'white'}}/>
                </div>
                <input type="text" className='channel-search__input__text'
                    placeholder='Search'
                    value={query}
                    onChange={onSearch}
                />
            </div>
            { query && (
                <ResultsDropdown
                teamChannels = {teamChannels}
                directChannels = {directChannels}
                loading = {loading}
                setChannel ={setChannel}
                setQuery = {setQuery}
                setToggleContainer = {setToggleContainer}
                />
            )}
        </div>
    )
}

export default ChannelSearch