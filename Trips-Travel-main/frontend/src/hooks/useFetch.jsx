import React, { useEffect, useState } from 'react'

const useFetch = (url, options = {}) => {
    const [apiData, setApiData] = useState();
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options)

                if (!response.ok) {
                    setError('failed to fetch')
                    // toast.error(error)           
                }

                const result = await response.json()
                setApiData(result.data)

            } catch (error) {

            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, JSON.stringify(options)])

    return { apiData, error }
}

export default useFetch
