import React,{useState,useEffect} from 'react'
import {db} from './Firebase'
import {useHistory} from 'react-router-dom'

let  unsubscribe = () => {

}

export default function Todo({user}) {
    const history = useHistory()
    const [text,setText] = useState('')
    const [mytodos,setMytodos] = useState([])
    useEffect(() => {
        
        if(user){
            const docRef = db.collection('todos').doc(user.uid)
            unsubscribe = docRef.onSnapshot(docSnapshot =>{
            if (docSnapshot.exists){
                console.log(docSnapshot.data().todos)
                setMytodos(docSnapshot.data().todos)
            }else{
                console.log('no logs')
            }
        })
        }else{
            history.push('/login')
        }
        return ()=>{
            //executed on umnounting
            unsubscribe()
        }
        
    },[history,user])
    let addTodo = () => {
       //making array of todos and then ading a new one otherwise overwrite problem would happen
        db.collection('todos').doc(user.uid).set({
            todos:[...mytodos,text]
        })
       
    }

    const deleteTodo = (deleteTodo) => {
        //reach the todo
        const docRef = db.collection('todos').doc(user.uid)
        docRef.get().then(docSnap => {
            const result = docSnap.data().todos.filter(todo => todo!== deleteTodo)
            //if deleteTodo and todo match it will fliter out else just return
            docRef.update({
                todos:result
            })
        })

    }
    return (
        
        <div className="center container" style={{maxWidth: "75rem"}}>
            <h3>Add Todos</h3>
            <div className="input-field">
                    <input type="text" placeholder="Add Todos"
                    value={text}
                     onChange={ (e) => setText(e.target.value)}
                     />
            </div>
            <button  className="btn blue" onClick={() => addTodo()}>Add</button>
            <ul className="collection">
                {mytodos.map((todo) => { return <li className="collection-item" key ={todo}>{todo}
                <i className="material-icons right" onClick={() => {deleteTodo(todo)}}>delete </i>
                </li>})}

            </ul>
        </div>
        
      
    )
}
