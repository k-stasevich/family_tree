import './Canvas.less';

import { DropTarget } from 'react-dnd';
import Node from 'components/pages/home/node/Node';

import DRAG_TYPES from 'constants/DragTypes';
import DRAG_SOURCES from 'constants/DragSources';

class Canvas extends React.Component {
  render() {
    const { tree } = this.props;

    return this.props.connectDropTarget(
      <div className="panel panel-primary" id={this.props.id}>
        <div className="panel-heading">Canvas</div>
        <div className="panel-body">
          {tree.map(function (item) {
            return (
              <Node
                key={item.id}
                nodeId={item.id}
                description={item.description}
                top={item.top}
                left={item.left}
                dragSource={DRAG_SOURCES.CANVAS}
                deleteNode={this.props.deleteNode}
                editNode={this.props.editNode}
              />
            );
          }, this)}
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  id: React.PropTypes.string,
  tree: React.PropTypes.array.isRequired,
  addNode: React.PropTypes.func.isRequired,
  editNode: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  canDrop: React.PropTypes.bool.isRequired,
};

export default DropTarget(DRAG_TYPES.NODE, {
    drop(props, monitor, component) {
      const item = monitor.getItem();

      if (item.dragSource === DRAG_SOURCES.TOOL_PANEL) {
        props.addNode();
      }

      else if (item.dragSource === DRAG_SOURCES.CANVAS) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);

        props.editNode(item.nodeId, { top, left })
      }

      return { name: 'Canvas' };
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
  })
)(Canvas);