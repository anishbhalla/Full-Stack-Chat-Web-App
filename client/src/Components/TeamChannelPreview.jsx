import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ channel, type, setToggleContainer, setIsCreating, setIsEditing, setActiveChannel }) => {
  const { channel: activeChannel, client } = useChatContext();
  const ChannelPreview = () => ( // For channel list
    <p className='channel-preview__item'>
      # {channel?.data?.name || channel?.data?.id}
    </p>
  )

  /*
  memberObjects
  {  
     user : {...userinfo}
  }
  {
     ...
  }
  */
  const DirectPreview = () => { // For DM list.                   // Destructuring 'user' from 'member' object.
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    return (
      <div className='channel-preview__item single'>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.users?.fullName || members[0]?.user?.name}
          size={24}
        />
        <p>{members[0]?.users?.fullName || members[0]?.user?.name}</p>
      </div>
    )
  }


  return (
    <div className={
      channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'
    }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevToggle) => !prevToggle)
        }
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  )
}

export default TeamChannelPreview