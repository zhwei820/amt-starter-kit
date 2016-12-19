import React from 'react';
import {
  render,
} from 'react-dom';
import {
  Router,
  Route,
  Link,
  IndexRoute,
  hashHistory,
  withRouter,
} from 'react-router';
import {
  Container,
  TabBar,
} from 'amazeui-touch';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import thunk from 'redux-thunk';

class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  render() {
    const {
      location,
      params,
      children,
      ...props,
    } = this.props;
const {
  router
} = this.context;
const transition = children.props.transition || 'sfr';

return (
  <Container direction="column" id="sk-container">
    <Container
      transition={transition}
      // fade transition example
      // transition='fade'
      // transitionEnterTimeout={450}
      // transitionLeaveTimeout={300}
      >
      {React.cloneElement(children, { key: location.key })}
    </Container>

    <TabBar
      amStyle="primary"
      >
      <TabBar.Item
        component={Link}
        icon="list"
        title="组件"
        selected={router.isActive('/', true)}
        to="/"
        onlyActiveOnIndex
        />
      <TabBar.Item
        component={Link}
        icon="info"
        title="关于"
        badge="404"
        // @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/docs/API.md#isactivepathorloc-indexonly
        selected={router.isActive('/about', true)}
        to="/about"
        onlyActiveOnIndex
        />
    </TabBar>
  </Container>
);
  }
}

// Pages
import Page from './pages/Page';

import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Page1 from './pages/page1/index';
import Page3 from './pages/page3/index';
import Page4 from './pages/page4/index';
import Demo from './pages/demo';

// withRouter HoC
// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide

import auth from './reducers/auth';
import user from './reducers/user';
import reducers from './reducers/index';
import todos from './reducers/todos';


const rootReducer = combineReducers({
  auth,
  user,
  reducers,
  todos
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));



const routes = (

  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/page" component={Page} />
        <Route path="/about" component={NotFound} />
        <Route path="/page1" component={Page1} />
        <Route path="/page3" component={Page3} />
        <Route path="/page4" component={Page4} />
        <Route path="/demo" component={Demo} />
      </Route>
    </Router>
  </Provider>

);

document.addEventListener('DOMContentLoaded', () => {
  render(routes, document.getElementById('root'));
});
