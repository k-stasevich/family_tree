import './Node.less';
import noAvatarImg from 'img/no-avatar.png';

import { DragSource } from 'react-dnd';

import DRAG_TYPES from 'constants/DragTypes';
import DRAG_SOURCES from 'constants/DragSources';

const Node = (props) => {
  const { connectDragSource } = props;
  const style = {
    left: props.left,
    top: props.top,
    opacity: props.isDragging ? 0.4 : 1,
  };

  if (props.dragSource === DRAG_SOURCES.CANVAS) {
    style.position = 'relative';
  }

  return (
    connectDragSource(
      <div className="node" style={style}>
        <div className="photo">
          <img src={props.img || noAvatarImg} />
        </div>
        <div className="description">{props.description}</div>
      </div>
    )
  );
};

Node.propTypes = {
  img: React.PropTypes.string,
  description: React.PropTypes.string,
  nodeId: React.PropTypes.number,
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  dragSource: React.PropTypes.string.isRequired,
  deleteNode: function(props, propName, componentName) {
    if (props.dragSource === DRAG_SOURCES.CANVAS && !props.deleteNode) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },
};

const canvasSource = {
  beginDrag(props) {
    return {
      dragSource: props.dragSource,
      nodeId: props.nodeId,
      top: props.top,
      left: props.left,
    };
  },

  endDrag(props, monitor) {
    // stub
  }
};

export default DragSource(DRAG_TYPES.NODE, canvasSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Node);