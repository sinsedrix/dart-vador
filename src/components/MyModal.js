import React from 'react'

const types = {
    'info' : { label: 'Info', icon: 'fa-exclamation-triangle'},
    'warn' : { label: 'Warning', icon: 'fa-exclamation-triangle'},
    'error' : { label: 'Error', icon: 'fa-exclamation-triangle'},
}

const MyModal = ({type, text, show, onClose}) => {
    let typObj = types[type || 'info']
    
    return show ? (
        <div className="mymodal">
            <h2><span className={`icon ${typObj.icon} ${type}`}></span>{typObj.label}</h2>
            <hr />
            <p>{text}</p>
            <button onClick={onClose}>Ok</button>
            <div className="bar">
                <button aria-label="Close" className="icon fa-times" onClick={onClose}></button>
            </div>
        </div>
    ) : null
}

export default MyModal