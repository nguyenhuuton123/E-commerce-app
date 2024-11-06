import React from 'react';

const Message = ({message, type}) => {

    let messageStyles = '';

    if(type === 'success') {
        messageStyles = 'text-green-500';
    }

    if(type === 'error') {
        messageStyles = 'text-red-500';
    }

    return (
        <p className={`${messageStyles} p-2 my-4 rounded`}>
            {message}
        </p>
    )

};

export default Message;