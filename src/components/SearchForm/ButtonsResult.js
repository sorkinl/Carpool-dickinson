import React from 'react';

export default ({ data, reset, defaultValues }) => (
    <>
    {data && (
        <pre style={{ textAlign: "left", color: "black" }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    )}

    <button
        className="button Black"
        type="button"
        onClick={() => {
            reset(defaultValues);
        }}
        >
        Reset
    </button>
    <button type="submit">submit</button>
    </>
);