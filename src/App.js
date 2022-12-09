import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import User from './components/User';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/getUsers').then((response) => {
      setListOfUsers(response.data);
    });
  }, []);
  const createUser = () => {
    axios
      .post('http://localhost:3001/createUser', { name, age, username })
      .then((response) => {
        alert('User Created!');
        setListOfUsers([...listOfUsers, { name, age, username }]);
      });
  };

  return (
    <div className="App">
      <h1>리뷰</h1>

      <div className="gird">
        {listOfUsers.map((user) => {
          return (
            <div className="list">
              <div>
                <User user={user} />
              </div>

              <h3>
                <p>Name: {user.name}</p>
                <p>bookname: {user.age}</p>
                <p>
                  Review:
                  {user.username}
                </p>
              </h3>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="text"
          placeholder="bookname"
          onChange={(event) => setAge(event.target.value)}
        />

        <input
          type="text"
          placeholder="write a review"
          onChange={(event) => setUsername(event.target.value)}
        />
        <button onClick={createUser}>제출!</button>
      </div>
    </div>
  );
}
export default App;
