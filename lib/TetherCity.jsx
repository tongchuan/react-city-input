import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tether from 'tether'

export default class TetherCity extends React.Component {
  constructor(props){
    super(props);
    this._update = this._update.bind(this);
    this._destroy = this._destroy.bind(this);
    this._updateTether = this._updateTether.bind(this);
    this.disable = this.disable.bind(this);
    this.enable = this.enable.bind(this);
    this.position = this.position.bind(this);
  }
  componentDidMount() {
    this._targetNode = ReactDOM.findDOMNode(this);
    this._update();
    console.log(this._targetNode)
  }
  componentDidUpdate () {
    this._update()
  }
  componentWillUnmount () {
    this._destroy()
  }
  render() {
    const { children } = this.props;
    let firstChild = null
    React.Children.forEach(children, (child, index) => {
      if(index === 0){
        firstChild = child;
        return false;
      }
    })
    return firstChild;
  }
  disable() {this._tether.disable()}
  enable() { this._tether.enable()}
  position() {this._tether.position()}
  _update() {
    const { children, renderElementTag, renderElementTo } = this.props
    // console.log(this.props)
    let elementComponent = children[1]
    if (!elementComponent) {
      // destroy Tether elements if they have been created
      if (this._tether) {
        this._destroy()
      }
      return
    }

    // console.log(children, renderElementTag, renderElementTo, elementComponent)
    if (!this._elementParentNode) {
      // create a node that we can stick our content Component in
      this._elementParentNode = document.createElement(renderElementTag)

      // append node to the end of the body
      const renderTo = renderElementTo || document.body
      renderTo.appendChild(this._elementParentNode)
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, elementComponent, this._elementParentNode, () => {
        // don't update Tether until the subtree has finished rendering
        this._updateTether()
      }
    )
  }
  _updateTether(){
    const { renderElementTag, renderElementTo, attachment, targetAttachment, targetOffset, classPrefix } = this.props // eslint-disable-line no-unused-vars
    const tetherOptions = {
      target: this._targetNode,
      element: this._elementParentNode,
      attachment,
      targetAttachment,
      targetOffset,
      classPrefix
    }

    if (!this._tether) {
      this._tether = new Tether(tetherOptions)
    } else {
      this._tether.setOptions(tetherOptions)
    }

    this._tether.position()
  }
  _destroy() {
    if (this._elementParentNode) {
      ReactDOM.unmountComponentAtNode(this._elementParentNode)
      this._elementParentNode.parentNode.removeChild(this._elementParentNode)
    }

    if (this._tether) {
      this._tether.destroy()
    }

    this._elementParentNode = null
    this._tether = null
  }
}

TetherCity.defaultProps = {
  renderElementTag: 'div',
  renderElementTo: null,
}

TetherCity.propTypes = {
  renderElementTag: PropTypes.string,
  renderElementTo: PropTypes.any,
  targetAttachment: PropTypes.oneOf([
    'top left',
    'top center',
    'top right',
    'middle left',
    'middle center',
    'middle right',
    'bottom left',
    'bottom center',
    'bottom right'
  ])
}