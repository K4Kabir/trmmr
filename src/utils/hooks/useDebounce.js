import {useEffect, useState} from 'react';

const UseDebounce = function (data, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState('')

    useEffect(() => {
        let interval = setTimeout(() => {
            setDebouncedValue(data);
        }, delay)
        return () => {
            clearInterval(interval)
        }

    }, [data, delay]);
    return {debouncedValue};
}

export default UseDebounce