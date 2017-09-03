import React from 'react';
import styles from './styles';

class Scroll extends React.PureComponent {

  elRoot;
  elContainer;
  elInner;
  elScroll;

  state = {
    hasScroll: true,
    scrollHeight: 0,
    heightRatio: 0,
    scrollPosition: 0,
    isDragging: false,
  };

  toggleScroll() {
    const elScroll = this.elScroll;
    const elInner = this.elInner;
    const elRoot = this.elRoot;
    const ratio = (elRoot.offsetHeight / elInner.offsetHeight) ;

    this.setState({
      hasScroll: ratio < 1,
      scrollHeight: ratio * elScroll.offsetHeight,
      heightRatio: elScroll.offsetHeight / elInner.offsetHeight,
    });
  }

  handleScroll = () => {
    const { heightRatio } = this.state;

    this.setState({
      scrollPosition: heightRatio * this.elContainer.scrollTop
    });
  };

  handleScrollClick = () => {

  };

  handleBarMouseDown = () => {

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
                  top: scrollPosition
                }}
                className={barClassName}
                onMouseDown={this.handleBarMouseDown}
              />
            </div>
          )
        }
      </div>
    )
  }
}

export default Scroll;