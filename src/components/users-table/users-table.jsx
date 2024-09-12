import React from "react"

const UsersTable = ({users, handleSelectAll, selectedUsers, handleSelectUser}) => {
    return (
        <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedUsers.length === users.length} />
                </th>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Last Login</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)} />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.registration_date).toLocaleString()}</td>
                  <td>{new Date(user.last_login).toLocaleString()}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
    )
}

export default UsersTable;