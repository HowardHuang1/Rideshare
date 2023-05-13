import React, { useState } from "react";

const Form = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // will send input data to backend here
        console.log('Input value: ' + inputValue);
        setInputValue(''); // clear input
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}

export default Form;