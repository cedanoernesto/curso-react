import React, { useState } from 'react';

function Name(props) {
    const [marked, setMarked] = useState(false);
    return (
        <div style={{backgroundColor: marked ? 'red' : 'transparent'}}>
            {props.value}
            &nbsp;
            <button onClick={() => props.removeName(props.value)}>Eliminar</button>
        </div>
    );
}
export default Name;