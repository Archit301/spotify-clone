import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlists from './Playlists';
import Player from './Player';
import Search from './Search';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [trackUri, setTrackUri] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = (query) => {
    if (token) {
      axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        setSearchResults(response.data.tracks.items);
      }).catch(error => {
        console.error('Error searching tracks', error);
      });
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Search onSearch={handleSearch} />
      <Playlists playlists={playlists} setTrackUri={setTrackUri} />
      <Player token={token} trackUri={trackUri} />
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map(track => (
            <li key={track.id} onClick={() => setTrackUri(track.uri)}>
              <img src={track.album.images[0].url} alt={track.name} />
              <p>{track.name} - {track.artists[0].name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
