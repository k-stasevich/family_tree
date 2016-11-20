import { Provider } from 'react-redux';
import DevTools from 'DevTools';
import Router from 'Router';

class RootContainer extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default RootContainer;