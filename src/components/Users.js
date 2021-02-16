import React, { useState, useEffect } from 'react';
import axios from 'axios';

import User from './User';

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/')
      .then((response) => {
        if (response.data.length > 0) {
          setUsers((prevState) => {
            return {
              ...prevState,
              users: response.data.map((user) => user),
            };
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteUser = (id) => {
    setUsers((prevState) => {
      return {
        ...prevState,
        users: users.users.filter((element) => element._id !== id),
      };
    });
    axios
      .delete('http://localhost:5000/users/' + id)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h3>Users</h3>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 ? (
            users.users.map((user) => (
              <User
                key={user._id}
                _id={user._id}
                username={user.username}
                deleteUser={deleteUser}
              />
            ))
          ) : (
            <tr>
              <td>Loading Users</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
