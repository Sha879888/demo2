import React, { useState, useEffect } from 'react';

let LoginForm = (props) => {
    let [test, setTest] = useState("");

    return (
        <div>
            <button onClick={() => {
                setTest("123");
                console.log(test);
            }}>click</button>
        </div>
    )
}

export default LoginForm;