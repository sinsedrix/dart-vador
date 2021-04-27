import React from 'react'

const types = {
    'info' : { label: 'Info', icon: 'fa-info-circle'},
    'warn' : { label: 'Warning', icon: 'fa-warning'},
    'error' : { label: 'Error', icon: 'fa-exclamation-circle'},
}

const MyModal = ({type, text, show, onClose}) => {
    let typObj = types[type || 'info']
    
    return show ? (
        <div className="mymodal">
            <h2><span className={`icon ${typObj.icon} ${type}`}></span>{typObj.label}</h2>
            <hr />
            <div className="modal-body">
                <p>{text}</p>
                <button className="action" onClick={onClose}>Ok</button>
            </div>
        </div>
    ) : null
}

export default MyModal