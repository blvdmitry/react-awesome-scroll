import React from 'react';
import styles from './styles';

/**
 * TODO:
 * - Handle bar drag
 * - Handle scroll click
 * - Add 2 flags for managing default styles
 * - Add activeClassName for bar
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
    const elRoot = this.elRoot;
    const elBar = this.elBar;

    return Math.max(0, Math.min(position, elRoot.offsetHeight - elBar.offsetHeight));
  }

  scrollToPosition = (position) => {
    const { heightRatio } = this.state;
    const top = this.elScroll.getBoundingClientRect().top;
    const scrollPosition = position - top;
    const limitedPosition = this.limitTrackPosition(scrollPosition);

    this.elContainer.scrollTop = scrollPosition / heightRatio;
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

    if (!isDragging && event.target !== elBar) {
      this.scrollToPosition(event.pageY);
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
      className, containerClassName, innerClassName, scrollClassName, barClassName,
      children,
    } = this.props;
    const { hasScroll, scrollHeight, scrollPosition } = this.state;

    return (
      <div
        style={styles.root}
        className={className}
        ref={c => this.elRoot = c}
      >
        <div
          style={styles.container}
          className={containerClassName}
          ref={c => this.elContainer = c}
          onScroll={this.handleScroll}
        >
          <div
            style={styles.inner}
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
              style={styles.scroll}
              className={scrollClassName}
              onClick={this.handleScrollClick}
            >
              <div
                style={{
                  ...styles.bar,
                  height: scrollHeight,
                  top: scrollPosition,
                }}
                ref={c => this.elBar = c}
                className={barClassName}
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