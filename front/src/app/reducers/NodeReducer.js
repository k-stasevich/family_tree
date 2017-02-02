import NODE_ACTIONS from 'constants/action-constants/NodeActionConstants';

const defaultState = {
  tree: [],
};

const nodeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NODE_ACTIONS.ADD_NODE:
      return addNode(state);
    case NODE_ACTIONS.DELETE_NODE:
      return deleteNode(state, action.id);
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
      description: 'node',
      top: 0,
      left: 0,
    }),
  };
}

function deleteNode(state, id) {
  const treeClone = state.tree.slice();
  const index = treeClone.findIndex(i => i.id === id);
  treeClone.splice(index, 1);

  return {
    ...state,
    tree: treeClone
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

  if (data.description !== undefined) {
    node.description = data.description;
  }
  
  if (data.img) {
    node.img = data.img;
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