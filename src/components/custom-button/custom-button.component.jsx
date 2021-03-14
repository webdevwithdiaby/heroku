import React from 'react';
import './custom-button.styles.scss';

function CustomButton({children,isGoogleSignIn,inverted,...restProps}) {
    return (
        <button 
            className={`custom-button ${isGoogleSignIn ? 'google-sign-in' : null} ${inverted ? 'inverted' : null} `} {...restProps} >
            {children}
        </button>
    )
}

export default CustomButton
