import { useState, useCallback } from "react";



// наш кастомный хук со совим стейтем, передаем ему url, он делает запрос на сервер,
// отлавливает ошибки и крутит спинер пока идет запрос
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

        setLoading(true);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status ${response.status}`);
            }
            const data = await response.json();

            setLoading(false);
            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError }
}