import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import About from './components/About';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Request from './components/Request';
import ApprovedRequests from './components/ApprovedRequests';
import RejectedRequests from './components/RejectedRequests';
import ActiveRequests from './components/ActiveRequests';
import ManageAccount from './components/ManageAccount';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ActiveRequestPage from './components/ActiveRequestPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path ="/">
          <Navbar />
          <LoginForm />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/adminDash">
            <Admin/>
          </Route>
          <Route path="/requests">
            <Request/>
          </Route>
          <Route path="/approved">
            <ApprovedRequests/>
          </Route>
          <Route path="/rejected">
            <RejectedRequests/>
          </Route>
          <Route path="/active">
            <ActiveRequests/>
          </Route>
          <Route path="/account">
            <ManageAccount/>
          </Route>
          <Route path="/request">
            <ActiveRequestPage />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;