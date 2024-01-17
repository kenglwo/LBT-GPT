import React, { useEffect } from 'react';

function StudentMessage({ message, index, onCompleted  }) {
    // Call onCompleted once the component is mounted
    useEffect(() => {
        if (onCompleted) {
            onCompleted();
        }
    }, []);  // Empty dependency array ensures this runs only once after the initial mount

    return (
        <p 
            className="system-message"
            key={index}
        >
            {message.text}
        </p>
    );
}

export default StudentMessage;
