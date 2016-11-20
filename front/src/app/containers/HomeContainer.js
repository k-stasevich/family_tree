import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import nodeActions from 'actions/NodeActions';
import HomePage from 'components/pages/home/HomePage';

const mapStateToProps = (state) => ({
  tree: state.nodeReducer.tree,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(nodeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);