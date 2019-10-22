import React, {useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import './App.css';
import {fetchApp} from './services/store/actions';
import {Page} from './pages/Page';

const App = () => {

  const dispatch = useDispatch();
  const pages = ['home', 'p1', 'p2', 'p3', 'p4', 'p5', 'new', 'different', 'etc']

  useEffect(() => {
    dispatch(fetchApp());
  }, [])

  return (
    <div className="App">
      <header className="app-header">
        {pages.map(page => <Link to={'./' + page} key={page}>{page}</Link>)}
      </header>
      <Switch>
        <Route path={'/:id'}><Page/></Route>
      </Switch>
    </div>
  )
};

export default App;
