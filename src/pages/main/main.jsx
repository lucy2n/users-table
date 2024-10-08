import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getUsers, blockUsers, unblockUsers, deleteUser, auth, db } from '../../services/firebase';
import lockImg from '../../assets/icons/icons8-lock.svg';
import unlockImg from '../../assets/icons/icons8-padlock.svg';
import deleteImg from '../../assets/icons/trash3.svg';
import UsersTable from '../../components/users-table/users-table';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const navigate = useNavigate();
  let currentUser = auth.currentUser;

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

  const logOut = async () => {
    await signOut(auth);
    navigate('/login');
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
    const isCurrentUserDeleted = selectedUsers.includes(currentUser.uid);

    for (const userId of selectedUsers) {
      await deleteUser(userId);
    }

    setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);

    if (isCurrentUserDeleted) {
      logOut();
    }
  };

  useEffect(() => {
    if (currentUser) {

      const userIndexRef = doc(db, 'Index/User/email', currentUser.email);

      async function fetchCurrentUserData() {
        const userIndexSnapshot = await getDoc(userIndexRef);
        const userUid = userIndexSnapshot.data().value;
        const userDocRef = doc(db, 'User', userUid);

        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          if (userData.status === 'blocked') {
            logOut();
          } else {
            setCurrentUserData(userData);
          }
        } else {
          logOut();
        }
      }

      fetchCurrentUserData();
    }
  }, [currentUser, logOut]);

  return (
    <div className="d-flex flex-column vh-100 w-auto">
      <div className="container d-flex justify-content-end mt-5">
        <p className="fs-5 m-0 p-3">Hello, {currentUserData?.username}!</p>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={logOut}
        > 
          Logout
        </button>
      </div>
      <div className="container mt-5">
        <div className="d-flex mb-3 w-10 h-10">
          <button
            className="btn btn-warning me-2"
            onClick={handleBlock}
            disabled={!selectedUsers.length}
          >
            <img
              style={{ width: "18px", height: "26px" }}
              src={lockImg}
              alt="lock" 
            />
            Block
          </button>
          <button
            className="btn btn-outline-success me-2"
            onClick={handleUnblock}
            disabled={!selectedUsers.length}
          >
            <img
              style={{ width: "18px", height: "26px" }}
              src={unlockImg}
              alt="unlock" 
            />
              Unblock
          </button>
          <button
            className="btn btn-outline-danger me-2"
            onClick={handleDeleteSelected}
            disabled={!selectedUsers.length}
          >
            <img
              style={{ width: "18px", height: "26px" }}
              src={deleteImg}
              alt="delete" 
            />
              Delete
          </button>
        </div>
        <UsersTable 
          users={users} 
          handleSelectAll={handleSelectAll} 
          selectedUsers={selectedUsers} 
          handleSelectUser={handleSelectUser}
        />
      </div>
    </div>
  );
}

export default Main;