import React, { useState } from 'react';

const MovieForm = ({ onSearch, isLoading }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        onSearch(description);
    };

    return (
        <div className="glass-panel">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Describe your mood, genre, or the kind of movie you're looking for... (e.g. 'Cyberpunk sci-fi with a strong female lead')"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? <div className="loader"></div> : 'Get Recommendations'}
                </button>
            </form>
        </div>
    );
};

export default MovieForm;
