import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5046/api/auth/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Manage Users</h1>
      {/* Render users here */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers; 