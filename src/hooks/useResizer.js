import { useState, useCallback, useEffect } from 'react';

export function useResizer() {
    const [leftWidth, setLeftWidth] = useState(() => window.innerWidth * 0.15);
    const [rightWidth, setRightWidth] = useState(() => window.innerWidth * 0.40);


    const [isResizingLeft, setIsResizingLeft] = useState(false);
    const [isResizingRight, setIsResizingRight] = useState(false);

    const startResizingLeft = useCallback((e) => {
        e.preventDefault();
        setIsResizingLeft(true);
    }, []);

    const startResizingRight = useCallback((e) => {
        e.preventDefault();
        setIsResizingRight(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizingLeft(false);
        setIsResizingRight(false);
    }, []);

    const resize = useCallback((e) => {
        if (isResizingLeft) {
            // Activity bar is 48px
            const newWidth = e.clientX - 48;
            if (newWidth > 100 && newWidth < 1200) {
                setLeftWidth(newWidth);
            }
        } else if (isResizingRight) {
            const newWidth = window.innerWidth - e.clientX;
            if (newWidth > 100 && newWidth < 1200) {
                setRightWidth(newWidth);
            }
        }

    }, [isResizingLeft, isResizingRight]);

    useEffect(() => {
        if (isResizingLeft || isResizingRight) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizingLeft, isResizingRight, resize, stopResizing]);

    return {
        leftWidth,
        rightWidth,
        isResizingLeft,
        isResizingRight,
        startResizingLeft,
        startResizingRight
    };
}
