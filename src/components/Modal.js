import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({children, onClose}) => {
    return (
        <div className="inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60 fixed">
            <div className="rounded w-11/12 bg-dark mx-auto max-w-md p-4 pt-1">
                {children}
            </div>
        </div>
    );
}

export default function ModalPortal({children, onClose}) {
    return ReactDOM.createPortal(
    <Modal onClose={onClose}>
        {children}
    </Modal>, 
    document.getElementById('modal-root')
    )
}
