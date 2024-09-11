// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { getUsers, blockUsers, unblockUsers, deleteUsers, auth, db } from '../../services/firebase';

function Main() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  useEffect(() => {
    async function fetchUsers() {
      const usersList = await getUsers();
      setUsers(usersList);
    }
    fetchUsers();
  }, []);

const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleBlock = async () => {
    await blockUsers(selectedUsers);
    setUsers(users.map((user) =>
      selectedUsers.includes(user.id) ? { ...user, status: 'blocked' } : user
    ));
    setSelectedUsers([]);
  };

  const handleUnblock = async () => {
    await unblockUsers(selectedUsers);
    setUsers(users.map((user) =>
      selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
    ));
    setSelectedUsers([]);
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.includes(currentUser.uid)) {

      await deleteUsers(selectedUsers);
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);

      await signOut(auth);
      
      navigate('/register');
    } else {
      await deleteUsers(selectedUsers);
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      
      // Следим за изменениями статуса текущего пользователя
      const unsubscribe = onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        
        if (userData === null) {
          // Пользователь удален
          signOut(auth);
          navigate('/login');
        } else if (userData.status === 'blocked') {
          // Пользователь заблокирован
          signOut(auth);
          navigate('/login');
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser, navigate]);

    return (
        <div className="container mt-5">
            <div className="d-flex mb-3">
                <button
                    className="btn btn-warning me-2"
                    onClick={handleBlock}
                    disabled={!selectedUsers.length}
                >
                  Block
                </button>
                <button
                    className="btn btn-success me-2"
                    onClick={handleUnblock}
                    disabled={!selectedUsers.length}
                >
                  Unblock
                </button>
                <button
                    className="btn btn-danger"
                    onClick={handleDeleteSelected}
                    disabled={!selectedUsers.length}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
            </div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedUsers.length === users.length}
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
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)}
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
            </table>
        </div>
);
}

export default Main;