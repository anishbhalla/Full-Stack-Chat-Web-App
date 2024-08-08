import { useState } from 'react';
import 'stream-chat-react/dist/css/v2/index.css';
import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';



import { ChannelListContainer, ChannelContainer, Auth } from './Components';

const cookies = new Cookies();
const apiKey = 'e5xa72zj952a';

const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get('token');

if (authToken) {
  client.connectUser({
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    id: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword')
  }, authToken);
}

function App() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />

  return (
      <div className="app__wrapper">
        <Chat client={client} theme='team light'>
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>
      </div>
  )
}

export default App
