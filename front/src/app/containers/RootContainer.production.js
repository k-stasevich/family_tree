import { Provider } from 'react-redux';
import Router from 'Router';

class RootContainer extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default RootContainer;