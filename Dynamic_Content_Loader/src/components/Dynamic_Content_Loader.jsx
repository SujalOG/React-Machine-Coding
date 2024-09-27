import React, { useState } from 'react';
import useLRUCache from '../hooks/useLRUCache';

const Dynamic_Content_Loader = () => {
    const [content, setContent] = useState([]);
    const { get, put } = useLRUCache(3);

    const loadContent = async (id) => {
        // Check if content is in cache
        const cachedContent = get(id);
        if (cachedContent) {
            console.log(`Content for Tab ${id} found in cache:`, cachedContent);
            setContent(prev => [...prev, cachedContent]);
        } else {
            console.log(`Loading content for Tab ${id}...`);
            // Simulate loading content
            await new Promise(resolve => setTimeout(resolve, 1000));
            const loadedContent = { id, text: `Tab ${id} Data` };

            // Store in cache
            put(id, loadedContent);
            console.log(`Content for Tab ${id} loaded and stored in cache:`, loadedContent);

            // Update state
            setContent(prev => [...prev, loadedContent]);
        }
    };

    const handleButtonClick = (id) => {
        loadContent(id);
    };

    return (
        <>
            <div>
                <h1>Dynamic Content Loader With LRU Cache</h1>
                <button onClick={() => handleButtonClick(1)}>Tab1</button>
                <button onClick={() => handleButtonClick(2)}>Tab2</button>
                <button onClick={() => handleButtonClick(3)}>Tab3</button>
                <button onClick={() => handleButtonClick(4)}>Tab4</button>
                <button onClick={() => handleButtonClick(5)}>Tab5</button>
            </div>
            <div>
                <h2>Loaded Content</h2>
                <ul>
                    {content.map((item, i) => (
                        <li key={`${item.id}${i}`}>{item.text}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Dynamic_Content_Loader;
