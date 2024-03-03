import React, { useState } from 'react';

function ToggleButton({ initialState = false, onChange }) {
    const [isToggled, setIsToggled] = useState(initialState);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        if (onChange) {
            onChange(!isToggled);
        }
    };

    return (
        <button
            className={`w-20 h-10 rounded-full focus:outline-none ${isToggled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
            onClick={handleToggle}
        >
            <span
                className={`block w-8 h-8 rounded-full transform transition-transform ${isToggled ? 'translate-x-10' : 'translate-x-0'
                    } bg-white shadow-md`}
            />
        </button>
    );
}

export default ToggleButton;
