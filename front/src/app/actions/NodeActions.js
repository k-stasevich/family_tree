import NODE_ACTIONS from 'constants/action-constants/NodeActionConstants';

const nodeActions = {
  addNode() {
    return {
      type: NODE_ACTIONS.ADD_NODE,
    };
  },

  deleteNode(id) {
    return {
      type: NODE_ACTIONS.DELETE_NODE,
      id,
    };
  },

  editNode(id, data) {
    return (dispatch) => {
      dispatch({
        type: NODE_ACTIONS.EDIT_NODE,
        id,
        data
      });
    };
  }
};

export default nodeActions;