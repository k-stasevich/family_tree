import NODE_ACTIONS from 'constants/action-constants/NodeActionConstants';

const nodeReducer = (state = {}, action) => {
  switch (action.type) {
    case NODE_ACTIONS.ADD_NODE:
      return addNode(state);
    case NODE_ACTIONS.DELETE_NODE:
      return state;
    case NODE_ACTIONS.EDIT_NODE:
      return editNode(state, action.id, action.data);
    default:
      return state;
  }
};

function addNode(state) {
  const { tree } = state;

  return {
    ...state,
    tree: tree.concat({
      id: _generateNewId(tree),
      description: '',
      top: 0,
      left: 0,
    }),
  };
}

function editNode(state, id, data) {
  const treeClone = state.tree.slice();
  const node = treeClone.find((i) => i.id === id);

  if (data.top) {
    node.top = data.top;
  }

  if (data.left) {
    node.left = data.left;
  }

  if (data.description) {
    node.description = data.description;
  }

  return {
    ...state,
    tree: treeClone,
  };
}

function _generateNewId(tree) {
  let newId;

  if (tree.length) {
    newId = tree[tree.length - 1].id + 1;
  } else {
    newId = 0;
  }

  return newId;
}

export default nodeReducer;