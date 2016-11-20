import Node from 'components/pages/home/node/Node';
import DRAG_SOURCES from 'constants/DragSources';

const ToolPanel = (props) => {
  return (
    <div className="panel panel-primary" id={props.id}>
      <div className="panel-heading">Toolbar</div>
      <div className="panel-body">
        <Node
          dragSource={DRAG_SOURCES.TOOL_PANEL}
        />
      </div>
    </div>
  );
};

export default ToolPanel;