import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlists from './Playlists';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      }).then(response => {
        setToken(response.data.access_token);
        window.history.pushState({}, null, '/dashboard');
      }).catch(error => {
        console.error('Error fetching the access token', error);
      });
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        setPlaylists(response.data.items);
      }).catch(error => {
        console.error('Error fetching playlists', error);
      });
    }
  }, [token]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Playlists playlists={playlists} />
    </div>
  );
};

export default Dashboard;
