import 'styles/main.less';
import 'bootstrap/dist/css/bootstrap.min.css';

import { render } from 'react-dom';

import RootContainer from 'containers/RootContainer';
import store from 'store/RootStore';

render(
  <RootContainer store={store} />,
  document.getElementById('react-app')
);
