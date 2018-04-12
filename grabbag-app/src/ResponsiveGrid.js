import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Infinite from 'react-infinite';

export default class ResponsiveGrid extends Component {
  static defaultProps = {
    onInfiniteLoad: () => { },
    isInfiniteLoadHandlerAsync: false,
    displayBottomUpwards: false,
    useWindowAsScrollContainer: false
  };

  static propTypes = {
    elements: PropTypes.arrayOf(PropTypes.element).isRequired,
    elementsPerRow: PropTypes.number.isRequired, // must be a factor of 12
    elementHeight: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    infiniteClassName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      infiniteScrollingEnabled: false,
      isInfiniteLoading: false
    };
    this._onInfiniteContainerScroll = this._onInfiniteContainerScroll.bind(this);

    if (this.props.isInfiniteLoadHandlerAsync) {
      this.onInfiniteLoad = this._asyncOnInfiniteLoad.bind(this);
    } else {
      this.onInfiniteLoad = this._synchronousOnInfiniteLoad.bind(this);
    }
  }

  _onInfiniteContainerScroll() {
    if (!this.state.infiniteScrollingEnabled) {
      this.setState({ infiniteScrollingEnabled: true });
    }
  }

  _synchronousOnInfiniteLoad() {
    if (this.state.infiniteScrollingEnabled) {
      this.setState({ isInfiniteLoading: true });
      this.props.onInfiniteLoad();
      this.setState({ isInfiniteLoading: false });
    }
  }

  async _asyncOnInfiniteLoad() {
    if (this.state.infiniteScrollingEnabled) {
      this.setState({ isInfiniteLoading: true });
      await this.props.onInfiniteLoad();
      this.setState({ isInfiniteLoading: false });
    }
  }

  render() {
    let rows = new Array(Math.ceil(
      this.props.elements.length / this.props.elementsPerRow));
    let containerClass = 'col-md-' + Math.ceil(12 / this.props.elementsPerRow);

    for (let row = 0; row < rows.length; row++) {
      let startIndex = row * this.props.elementsPerRow;
      let componentRow = this.props.elements.slice(startIndex,
        startIndex + this.props.elementsPerRow).map((element, index) => {
          return (
            <div className={containerClass} key={startIndex + index}>
              {element}
            </div>
          );
        });
      rows[row] = <div className='row' key={row}>{componentRow}</div>;
    }

    return (
      <Infinite
        className={this.props.infiniteClassName}
        elementHeight={this.props.elementHeight}
        containerHeight={this.props.containerHeight}
        useWindowAsScrollContainer={this.props.useWindowAsScrollContainer}
        handleScroll={this._onInfiniteContainerScroll}
        infiniteLoadBeginEdgeOffset={this.props.elementHeight * 2}
        onInfiniteLoad={this.onInfiniteLoad}
        isInfiniteLoading={this.state.isInfiniteLoading}
        displayBottomUpwards={this.props.displayBottomUpwards}>
        {rows}
      </Infinite>
    );
  }
}