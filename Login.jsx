import React from 'react';

const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=playlist-read-private`;

  return (
    <div className="login">
      <h1>Spotify Clone</h1>
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

export default Login;
