import './HomePage.less';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Canvas from './canvas/Canvas';
import ToolPanel from './tool-panel/ToolPanel';

class HomPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" id="home-page">
        <div className="row">
          <div className="col-xs-8 col-md-8">
            <Canvas
              id="canvas"
              tree={this.props.tree}
              addNode={this.props.addNode}
              editNode={this.props.editNode}
              deleteNode={this.props.deleteNode}
            />
          </div>

          <div className="col-xs-4 col-md-4">
            <ToolPanel
              id="tool-panel"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(HomPage);