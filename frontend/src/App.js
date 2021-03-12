import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import CreateProfile from './screens/CreateProfile'
import Profile from './screens/Profile'
import PostDetails from './screens/PostDetails'
import DiscoverProfiles from './screens/DiscoverProfiles'
import OthersProfile from './screens/OthersProfile'
import EditProfile from './screens/EditProfile'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/signup' component={SignUpScreen} exact />
        <Route path='/createprofile' component={CreateProfile} exact />
        <Route path='/editprofile' component={EditProfile} exact />
        <Route path='/profile' component={Profile} exact />
        <Route path='/profile/:id' component={OthersProfile} exact />
        <Route path='/profiles' component={DiscoverProfiles} exact />
        <Route path='/:pseudo/:postId' component={PostDetails} exact />
      </Switch>
    </Router>
  )
}

export default App
