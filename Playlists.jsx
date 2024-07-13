import React from 'react';

const Playlists = ({ playlists }) => {
  return (
    <div className="playlists">
      <h2>Your Playlists</h2>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>
            <img src={playlist.images[0].url} alt={playlist.name} />
            <p>{playlist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
