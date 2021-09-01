import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import {auth} from './Firebase'

export default function Navbar({user}) {
    const history = useHistory()
    return (
        <div>
            <nav>
                <div className="nav-wrapper blue">
                    <Link to="/" className="brand-logo">Todo</Link>
                    <ul id="nav-mobile" className="right">

                        {user?
                        <li>
                        <button className="btn red"
                        onClick={(e) => {
                            auth.signOut()
                            history.push('/login')
                        }}
                        >Logout</button>
                        </li> :
                        <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        </>
                        }
                        
                        
                    </ul>
                </div>
            </nav>

        </div>
    )
}
