import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    contact: user?.contact || '',
    role: user?.role || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!profile.name || !profile.email || !profile.contact) {
      setError('Name, email and contact are required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess('Profile updated successfully');
      }
    } catch (error) {
      setError('Update failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          logout();
          navigate('/');
        }
      } catch (error) {
        setError('Delete failed. Please try again.');
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={(e) => setProfile({...profile, address: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={(e) => setProfile({...profile, contact: e.target.value})}
          />
        </div>
        <div className="profile-actions">
          <button type="submit" className="update-btn" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/change-password')} 
            className="password-btn"
          >
            Change Password
          </button>
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}
