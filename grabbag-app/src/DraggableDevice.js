import React, { Component } from 'react';
// import { DragSource } from 'react-dnd';

export default class DraggableDevice extends Component {
    render() {
        return <div className="row">{this.props.device.display_title}</div>;
    }
}
