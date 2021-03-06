import {BrowserRouter as Router, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Browse from './components/Browse/Browse'
import Create from './components/Create/Create'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Survey from './components/Survey/Survey'
import PasswordReset from './components/Authentication/PasswordReset'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Nav />
          <Route path="/" exact component={Home} />
          <Route path="/browse" exact component={Browse} />
          <PrivateRoute path="/create" exact component={Create} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/resetpassword" exact component={PasswordReset} />
          <Route path="/survey/:id" component={Survey} />
          <PrivateRoute path="/profile" exact component={Profile} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
