import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "./ChangePassword.css";

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setError('New passwords do not match');
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess('Password updated successfully');
        setTimeout(() => navigate('/profile'), 2000);
      }
    } catch (error) {
      setError('Password change failed. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Change Password</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
            required
          />
        </div>
        <div className="profile-actions">
          <button type="submit" className="update-btn">Update Password</button>
          <button type="button" onClick={() => navigate('/profile')} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
