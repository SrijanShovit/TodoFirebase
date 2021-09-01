//https://todofirebase-7c865.web.app/login
import Navbar from './Navbar'
import Todo from './Todo'
import Login from './Login'
import Signup from './Signup'
import {useState,useEffect} from 'react'
import {auth} from './Firebase'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {
  //checking if there is user;setting State according to that
    const [user,setUser] = useState(null)
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user){
          setUser(user)
        }else{
          setUser(null)
        }
      })
      return () => {unsubscribe()}
    }, [])
    return (
    <>
    <Router>
      <Navbar user={user}/>
        <Switch>
          <Route exact path="/"><Todo user={user}/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/signup"><Signup/></Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
