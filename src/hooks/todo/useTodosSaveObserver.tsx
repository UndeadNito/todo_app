import React, { useState, useEffect } from "react"

const useTodosSaveObserver = (): [boolean, () => void] =>{
    const [saved, setSaved] = useState(true);

    useEffect(() =>{
        window.addEventListener('todos-changed', MarkAsUnsaved)
        window.addEventListener('todos-saved', MarkAsSaved)

        return () =>{
            window.removeEventListener('todos-changed', MarkAsUnsaved)
            window.removeEventListener('todos-saved', MarkAsSaved)
        }
    }, [])

    const MarkAsSaved = () =>{
        setSaved(true);
    }

    const MarkAsUnsaved = () =>{
        setSaved(false);
    }

    return [
        saved,
        () => window.dispatchEvent(new Event('todos-save-force')),
    ];
}

export default useTodosSaveObserver;