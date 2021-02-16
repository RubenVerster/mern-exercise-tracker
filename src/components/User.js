import React from 'react';

const User = ({ deleteUser, username, _id }) => {
  return (
    <tr key={_id}>
      <td>{username}</td>
      <td>
        <a
          href="#"
          onClick={() => {
            deleteUser(_id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

export default User;
