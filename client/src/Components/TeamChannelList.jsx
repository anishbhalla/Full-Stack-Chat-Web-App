import React from 'react';
import { UsergroupAddOutlined,UserAddOutlined } from '@ant-design/icons';
const TeamChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing , setToggleContainer}) => {
  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null
  }

  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type === 'team' ? 'Channels' : 'Messages'} Loading...
        </p>
      </div>
    )
  }



  return (
    // <div className='team-channel-list'>
    //   <div className='team-channel-list__header'>
    //     <p className='team-channel-list__header__title'>
    //     {type === 'team' ?  'Channels' : 'Direct Messages'}
    //     </p>
    //     {type === 'team' ? <UsergroupAddOutlined/> : <UserAddOutlined/>}
    //   </div>
    //   {children}
    // </div>
    <div style={{background:'red'}}>
      <div style={{display : 'flex', flexDirection:'row',justifyContent : 'space-evenly',paddingBottom:'20px'}}>
        <p style={{color:'white'}}>
        {type === 'team' ?  'Channels' : 'Direct Messages'}
        </p>
        {type === 'team' ? <UsergroupAddOutlined onClick={()=>{
          setCreateType(type);
          setIsCreating((prevState)=>!prevState);
          setIsEditing(false);
          if (setToggleContainer) setToggleContainer((prevState)=>!prevState);
        }} style={{color:'white'}} setToggleContainer={setToggleContainer}/> : <UserAddOutlined onClick={()=>{
          setCreateType(type);
          setIsCreating((prevState)=>!prevState);
          setIsEditing(false);
          if (setToggleContainer) setToggleContainer((prevState)=>!prevState);
        }} style={{color:'white'}} setToggleContainer={setToggleContainer}/>}
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList