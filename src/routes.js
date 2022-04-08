
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';

import Filme from './pages/Filme';

import Favorite from './pages/Favorite';

import Error from './pages/Error';

const Routes = () => {
  return(
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/Filme/:id' component={Filme}/>
        <Route exact path='/Favorite' component={Favorite}  />
        <Route path='*' component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;