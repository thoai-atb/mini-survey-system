import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Browse from './components/Browse/Browse'
import Create from './components/Create/Create'
import Login from './components/Login/Login'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/browse" exact component={Browse} />
        <Route path="/create" exact component={Create} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
