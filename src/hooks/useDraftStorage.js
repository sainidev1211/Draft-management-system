import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'drafts_storage';

/**
 * Custom hook to manage draft data with localStorage persistence
 * @returns {Object} Object containing drafts array and CRUD functions
 */
export const useDraftStorage = () => {
    const [drafts, setDrafts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize drafts from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setDrafts(JSON.parse(stored));
            }
            setIsLoading(false);
        } catch (err) {
            setError('Failed to load drafts');
            setIsLoading(false);
        }
    }, []);

    // Persist drafts to localStorage whenever they change
    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
            } catch (err) {
                setError('Failed to save drafts');
            }
        }
    }, [drafts, isLoading]);

    // Create a new draft
    const createDraft = useCallback((title, content) => {
        const newDraft = {
            id: Date.now(),
            title: title || 'Untitled Draft',
            content: content || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setDrafts((prev) => [newDraft, ...prev]);
        return newDraft;
    }, []);

    // Update an existing draft
    const updateDraft = useCallback((id, updates) => {
        setDrafts((prev) =>
            prev.map((draft) =>
                draft.id === id ?
                {
                    ...draft,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                } :
                draft
            )
        );
    }, []);

    // Delete a draft
    const deleteDraft = useCallback((id) => {
        setDrafts((prev) => prev.filter((draft) => draft.id !== id));
    }, []);

    // Get a specific draft by ID
    const getDraftById = useCallback((id) => {
        return drafts.find((draft) => draft.id === id);
    }, [drafts]);

    // Clear all drafts
    const clearAllDrafts = useCallback(() => {
        setDrafts([]);
    }, []);

    return {
        drafts,
        isLoading,
        error,
        createDraft,
        updateDraft,
        deleteDraft,
        getDraftById,
        clearAllDrafts,
    };
};