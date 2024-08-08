import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';
//import { UserList } from './';
//import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  }

  return (
    <div className='channel-name-input__wrapper'>
      <p>Name (No Spaces)</p>
      <input type="text" value={channelName} onChange={handleChange} placeholder='channel-name ' />
      <p>Add Members</p>
    </div>
  )
}

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');

  const createChannelFunction = async (e) => {
    e.preventDefault();
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='create-channel__container'>
      <div className='create-channel__header'>
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
        {/* <CloseCreateChannel setIsCreating={setIsCreating}> */}
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers} createType={createType} />
      <div className="create-channel__button-wrapper" onClick={createChannelFunction} selectedUsers={selectedUsers}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message'}</p>
      </div>
    </div>
  )
}

export default CreateChannel;
