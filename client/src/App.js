import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          {/* Default path to Search Books page */}
          <Route exact path='/' component={SearchBooks} />
          {/* Path for actively logged in users toview Saved Books page*/}
          <Route exact path='/saved' component={SavedBooks} />
          {/* Any other path */}
          <Route render={() => <h1 className='display-2'>Page doesn't exist</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
