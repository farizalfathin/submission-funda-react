import { useState } from 'react';

export const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = ({ target }) => {
        setValue(target.value);
    }

    return [value, onChange];
}