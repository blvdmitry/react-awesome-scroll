import React from 'react';
import styles from './styles';

/**
 * TODO:
 * - Readme
 * - Submit to frontend collectives
 */

class Scroll extends React.PureComponent {

  elRoot;
  elContainer;
  elInner;
  elScroll;
  elBar;
  startDragMousePosition;
  startDragPosition;

  state = {
    hasScroll: true,
    scrollHeight: 0,
    heightRatio: 0,
    scrollPosition: 0,
    isDragging: false,
  };

  toggleScroll = () => {
    const elScroll = this.elScroll;
    const elInner = this.elInner;
    const elRoot = this.elRoot;
    const ratio = (elRoot.offsetHeight / elInner.offsetHeight) ;

    this.setState({
      hasScroll: ratio < 1,
      scrollHeight: ratio * elScroll.offsetHeight,
      heightRatio: elScroll.offsetHeight / elInner.offsetHeight,
    });
  };

  limitTrackPosition(position) {
    const elScroll = this.elScroll;
    const elBar = this.elBar;

    return Math.max(0, Math.min(position, elScroll.offsetHeight - elBar.offsetHeight));
  }

  scrollToPosition = (position) => {
    const { heightRatio } = this.state;
    const limitedPosition = this.limitTrackPosition(position);

    this.elContainer.scrollTop = position / heightRatio;
    this.setState({
      scrollPosition: limitedPosition,
    });
  };

  handleScroll = () => {
    const { heightRatio } = this.state;

    this.setState({
      scrollPosition: heightRatio * this.elContainer.scrollTop
    });
  };

  handleScrollClick = (event) => {
    const { isDragging } = this.state;
    const elBar = this.elBar;
    const top = this.elScroll.getBoundingClientRect().top;

    if (!isDragging && event.target !== elBar) {
      this.scrollToPosition(event.pageY - top);
    }
  };

  handleDragStart = (event) => {
    const { scrollPosition } = this.state;

    this.startDragMousePosition = event.pageY;
    this.startDragPosition = scrollPosition;
    this.setState({ isDragging: true });

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
  };

  handleDrag = (event) => {
    const { isDragging } = this.state;

    if (isDragging) {
      this.scrollToPosition(this.startDragPosition + event.pageY - this.startDragMousePosition);
    }
  };

  handleDragEnd = () => {
    this.setState({
      isDragging: false
    });
  };

  componentDidMount() {
    this.toggleScroll();
    window.addEventListener('resize', this.toggleScroll);
  }

  render() {
    const {
      className, containerClassName, innerClassName, scrollClassName, barClassName, barActiveClassName,
      children,
      disableUIStyles, disableStyles,
    } = this.props;
    const { hasScroll, scrollHeight, scrollPosition, isDragging } = this.state;
    const rootStyles = !disableStyles && styles.root;
    const containerStyles = Object.assign(
      {},
      !disableStyles && styles.container,
      !disableUIStyles && !disableStyles && styles.containerUI,
    );
    const innerStyles = !disableStyles && styles.inner;
    const scrollStyles = Object.assign(
      {},
      !disableStyles && styles.scroll,
      !disableUIStyles && !disableStyles && styles.scrollUI,
    );
    const barStyles = Object.assign(
      {},
      !disableStyles && styles.bar,
      !disableUIStyles && !disableStyles && styles.barUI,
    );
    const barClassNames = [barClassName];

    if (isDragging && barActiveClassName) {
      barClassNames.push(barActiveClassName);
    }

    return (
      <div
        style={rootStyles}
        className={className}
        ref={c => this.elRoot = c}
      >
        <div
          style={containerStyles}
          className={containerClassName}
          ref={c => this.elContainer = c}
          onScroll={this.handleScroll}
        >
          <div
            style={innerStyles}
            className={innerClassName}
            ref={c => this.elInner = c}
          >
            { children }
          </div>
        </div>

        {
          hasScroll && (
            <div
              ref={c => this.elScroll = c}
              style={scrollStyles}
              className={scrollClassName}
              onClick={this.handleScrollClick}
            >
              <div
                style={{
                  ...barStyles,
                  height: scrollHeight,
                  top: scrollPosition,
                }}
                ref={c => this.elBar = c}
                className={barClassNames.join(' ')}
                onMouseDown={this.handleDragStart}
              />
            </div>
          )
        }
      </div>
    )
  }
}

export default Scroll;
