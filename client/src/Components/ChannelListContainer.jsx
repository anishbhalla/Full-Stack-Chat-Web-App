import React, { useState } from 'react';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import chaticon from '../assets/chaticon.png';
import { LogoutOutlined, RightCircleOutlined } from '@ant-design/icons';
import { ChannelList, useChatContext } from 'stream-chat-react';


import Cookies from 'universal-cookie';
// TeamChannelList, TeamChannelPreview

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className='channel-list__sidebar'>
    <img className='chaticon' src={chaticon} alt="chat" width="55" height="55" />
    <p className='appname museomoderno-appname'>SPEAK &nbsp;EASY</p>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner' onClick={logout}>
        <LogoutOutlined style={{ height: '80' }} />
      </div>
    </div>
  </div>

)

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Chats</p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } }

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader setToggleContainer={setToggleContainer} />
        <ChannelSearch />
        <ChannelList // For group messages
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList // For direct Messages.
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent setIsCreating={setIsCreating}
          setCreateType={setCreateType} 
          setIsEditing={setIsEditing}
        /> {/*desktop*/}
      </div>


      <div className="channel-list__container-responsive" onClick={() => setToggleContainer((prevToggle) => !prevToggle)} style={{ left: toggleContainer ? "0.1px" : "-88%" , width : toggleContainer && '310px'}}>
        {/* <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggle) => !prevToggle)}>
        </div> */}
        <ChannelListContent setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        /> {/*mobile*/}
      </div>
    </>
  )
}

export default ChannelListContainer