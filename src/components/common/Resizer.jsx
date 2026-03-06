import React from 'react';

const Resizer = ({ onMouseDown, className = '', isVisible = true }) => {
    if (!isVisible) return null;

    return (
        <div
            onMouseDown={onMouseDown}
            className={`hidden lg:block w-[4px] cursor-col-resize z-20 transition-colors ${className}`}
        />
    );
};

export default Resizer;
