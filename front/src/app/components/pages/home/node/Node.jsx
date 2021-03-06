import './Node.less';
import noAvatarImg from 'img/no-avatar.png';
import UploadPhotoBlock from './upload-photo-block/UploadPhotoBlock';
import { DragSource } from 'react-dnd';

import DRAG_TYPES from 'constants/DragTypes';
import DRAG_SOURCES from 'constants/DragSources';

function getOnDescriptionChangeFunction(props) {
  return function(event) {
    const newValue = event.target.value;
    props.editNode(props.nodeId, { description: newValue });
  };
}

const Node = (props) => {
  const { connectDragSource } = props;
  const style = {
    left: props.left || 10,
    top: props.top || 10,
    opacity: props.isDragging ? 0.4 : 1,
  };

  if (props.dragSource === DRAG_SOURCES.CANVAS) {
    style.position = 'absolute';
  }

  return (
    connectDragSource(
      <div className="node" style={style}>
        <UploadPhotoBlock
          show={typeof props.nodeId === 'number'}
          nodeId={props.nodeId}
          editNode={props.editNode}
        />

        <div className="photo">
          <img src={props.img || noAvatarImg} />
        </div>
        <input
          type="text"
          className="description"
          onChange={getOnDescriptionChangeFunction(props)}
          value={props.description}
        />
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
  deleteNode: React.PropTypes.func,
  editNode: React.PropTypes.func,
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
    const isNewNode = monitor.getItem().nodeId === undefined;
    const droppedOutsideCanvas = !monitor.didDrop();

    if (!isNewNode && droppedOutsideCanvas) {
      props.deleteNode(props.nodeId);
    }
  }
};

export default DragSource(DRAG_TYPES.NODE, canvasSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Node);