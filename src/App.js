import React,{useState,useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// REDUX Components
import {useDispatch} from 'react-redux'
import { getPosts  } from './actions/posts';
// JS Components
import Base from './Components/constants/Base/Base';
import Home from './Pages/Home/home'
import Registration from './Pages/Registration/Registration';

function App() {
 const [currentID,setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  },[currentID,dispatch]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
          <Base> 
              <Home/>
          </Base>
          </Route>
          <Route exact path="/Registration" >
          <Base> 
              <Registration currentID={currentID} setCurrentId={setCurrentId}/>
          </Base>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
