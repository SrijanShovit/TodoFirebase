import React,{useState} from 'react'
import {auth} from './Firebase'
import {useHistory} from 'react-router-dom'

export default function Signup() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(email, password)
        try {
        const result = await auth.createUserWithEmailAndPassword(email, password)
        window.M.toast({html: `Welcome ${result.user.email}`,classes: 'green'})
        history.push('/')
        }catch (err) {
            window.M.toast({html: err.message,classes: 'green'})
        }
        
    }
    return (
        <div className="center container" style={{maxWidth: "50rem"}}>
            <h3>Please Sign up</h3>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <div className="input-field">
                    <input type="email" placeholder="Email"
                    value={email} 
                     onChange={ (e) => setEmail(e.target.value)}
                     />
                    <input type="password" placeholder="Password"
                     onChange={ (e) => setPassword(e.target.value)}
                     value={password}
                     />
                </div>
                <button type="submit" className="btn blue">Signup</button>
            </form>
        </div>
    )
}
