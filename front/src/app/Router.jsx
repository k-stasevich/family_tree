import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import IndexRoute from 'react-router/lib/IndexRoute';
import history from './history';

// import app modules (pages)
import BasePageTemplate from 'components/pages/BasePageTemplate';
import HomeContainer from 'containers/HomeContainer';

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={BasePageTemplate}>
          <IndexRoute component={HomeContainer} />
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
