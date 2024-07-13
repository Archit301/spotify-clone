import React from 'react';

const Playlists = ({ playlists, setTrackUri }) => {
  return (
    <div className="playlists">
      <h2>Your Playlists</h2>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>
            {playlist.images[0] && (
              <img src={playlist.images[0].url} alt={playlist.name} />
            )}
            <p>{playlist.name}</p>
            <button onClick={() => setTrackUri(playlist.uri)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
