import React,{useState} from 'react';
import { useChatContext,CloseIcon} from 'stream-chat-react';
import UserList from './UserList';
//import { closeCreateChannel } from '../assets'

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

export const EditChannel = ({setIsEditing,createType = 'team'}) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const updateChannel = async (e) => {
    e.preventDefault();
    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged){
      await channel.update({name : channelName}, {text : `Channel Name changed to ${channelName}`})
    }

    if (selectedUsers.length){
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  }

  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>
        <p>Edit Channel</p>
        {/* <CloseIcon  setIsEditing={setIsEditing}/> */}
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
      <UserList setSelectedUsers={setSelectedUsers} createType={createType = 'team'}/>
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  )
}

export default EditChannel;
