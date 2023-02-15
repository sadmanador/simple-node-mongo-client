import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleFormInput = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    //sending user to server
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch((err) => console.error(err));
    event.target.reset();
  };

  return (
    <div className="App">
      <form onSubmit={handleFormInput}>
        <input type="text" placeholder="Name" name="name" />
        <input type="email" placeholder="Email" name="email" />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>NO. of users: {users.length}</h2>
        {users.map((user) => (
          <h3 key={user.id}>
            {user.name}___{user.email}
          </h3>
        ))}
      </div>
    </div>
  );
}

export default App;
