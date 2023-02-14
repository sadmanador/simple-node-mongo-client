import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers]= useState([])

  useEffect(() => {
    fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleFormInput = (event) => {
    event.preventDefault();
  };


  return (
    <div className="App">
     <form onSubmit={handleFormInput}>
      <input type="text" placeholder='Name' name='name'/>
      <input type="email" placeholder='Email' name='email'/>
      <button type='submit'>Submit</button>
     </form>

     <div>
      {
        users.map(user => <p key={user.id}>{user.name} {user.email}</p>)
      }
     </div>
    </div>
  );
}

export default App;
