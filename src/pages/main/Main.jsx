import React from "react";
import Table from 'react-bootstrap/Table';

const users = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      registration_date: '2023-01-15T10:45:00Z',
      last_login: '2023-09-01T08:30:00Z',
      status: 'active',
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      registration_date: '2023-02-20T12:00:00Z',
      last_login: '2023-09-05T09:15:00Z',
      status: 'blocked',
    },
    {
      id: 3,
      username: 'mike_ross',
      email: 'mike@example.com',
      registration_date: '2023-03-10T14:20:00Z',
      last_login: '2023-09-03T16:45:00Z',
      status: 'active',
    },
    {
      id: 4,
      username: 'linda_jones',
      email: 'linda@example.com',
      registration_date: '2023-04-05T08:30:00Z',
      last_login: '2023-09-02T11:00:00Z',
      status: 'active',
    },
    {
      id: 5,
      username: 'steve_harper',
      email: 'steve@example.com',
      registration_date: '2023-05-25T17:00:00Z',
      last_login: '2023-08-30T15:00:00Z',
      status: 'blocked',
    },
    {
      id: 6,
      username: 'anna_martin',
      email: 'anna@example.com',
      registration_date: '2023-06-15T19:30:00Z',
      last_login: '2023-09-06T13:30:00Z',
      status: 'active',
    },
    {
      id: 7,
      username: 'bob_turner',
      email: 'bob@example.com',
      registration_date: '2023-07-01T10:00:00Z',
      last_login: '2023-09-04T10:45:00Z',
      status: 'blocked',
    },
    {
      id: 8,
      username: 'carol_adams',
      email: 'carol@example.com',
      registration_date: '2023-08-10T15:45:00Z',
      last_login: '2023-09-07T09:00:00Z',
      status: 'active',
    },
  ];

const Main = () => {
    return (
        <div className="container mt-5">
            {/* Toolbar */}
            <div className="d-flex mb-3">
                <button
                    className="btn btn-warning me-2"
                >
                    Block
                </button>
                <button
                    className="btn btn-success me-2"
                >
                    Unblock
                </button>
                <button
                    className="btn btn-danger"
                >
                    <i className="bi bi-trash"></i> Delete
                </button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                            />
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
                                />
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
            </Table>
        </div>
    );
}

export default Main;