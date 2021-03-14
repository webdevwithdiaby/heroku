import React from 'react';
import {Link} from  'react-router-dom';
import {ReactComponent as Logo} from  '../../assets/logo.svg'
import './header.styles.scss';

import {auth} from '../../firebase/firebase.utils';

import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import {createStructuredSelector} from 'reselect';

function Header({currentUser,hidden}) {
    return (
        <div className='header' >
            <Link to='/' className='logo-container' >
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link to='/shop' className='option' >SHOP</Link>
                <Link to='/contact' className='option' >CONTACT</Link>
                {
                    currentUser ?
                    <div className='option' onClick={() => auth.signOut() } >SIGN OUT</div> 
                    :
                    <Link to='/signin' className='option' >SIGN IN</Link>
                }
                <CartIcon/>
            </div>
            {
                hidden ? null 
                :
                <CartDropdown/>
            }
        </div>
    )
}

//Function that allow us to access the state inside our root-reducer

/*const mapStateToProps = store => ({
    currentUser: selectCurrentUser(store),
    hidden: selectCartHidden(store)
});*/

//improved with createStructuredSelector
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
