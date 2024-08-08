import React, { Children } from 'react';
import { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { CheckCircleOutlined,PlusCircleOutlined,RightOutlined,DoubleRightOutlined } from '@ant-design/icons';
//import {InviteIcon} from '../assets';

const ListContainer = ({ children, createType}) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>{ createType ==='team' ? 'Invite' : 'Chat'}</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers,createType}) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () =>{
        if (selected){
            setSelectedUsers((prevUsers)=>prevUsers.filter((prevUser)=>prevUser !== user.id));
        } else{
            setSelectedUsers((prevUsers)=>[...prevUsers,user.id]);
        }


        setSelected((prevSelected)=>!prevSelected);

    }

    return (
        <div className='user-item__wrapper' onClick={handleSelect}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.name || user.id} shape='circle' size={35} />
                <p className='user-item__name'>{user.name|| user.id}</p>
            </div>
            {createType ==='team' && ( selected ? <CheckCircleOutlined  style={{height:'20px', width:'20px',color:'green'}}/> : <PlusCircleOutlined style={{height:'20px', width:'20px'}} /> )}
            {createType === 'messaging' && (
                 selected ? <DoubleRightOutlined /> : <RightOutlined /> 
            )}
        </div>
    )
}

const UserList = ({setSelectedUsers,createType}) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setLoading(true);
            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                );

                if (response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
                setError(true);  // If there is a problem fetching the users.
            }
            setLoading(false);
        }
        if (client) getUsers();
    }, [])

    if (error){
        <ListContainer createType={createType}>
            <div className="user-list__message">
                Error loading, please refresh and try again ...
            </div>
        </ListContainer>
    }

    if (listEmpty){
        <ListContainer createType={createType}>
            <div className="user-list__message">
                No Users found :(
            </div>
        </ListContainer>
    }

    return (
        <ListContainer createType={createType} >
            {loading ? <div className='user-list__message'>
                Loading Users ...
            </div> : (
                users?.map((user, i) => (
                    <UserItem key={user.id} user={user} setSelectedUsers={setSelectedUsers} createType={createType} />
                ))
            )}
        </ListContainer>
    )
}

export default UserList;