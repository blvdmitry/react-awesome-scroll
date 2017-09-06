# react-awesome-scroll

[![npm](https://img.shields.io/badge/npm-react--awesome--scroll-brightgreen.svg?style=flat-square)](https://bananabobby.github.io/react-awesome-scroll/)
[![npm version](https://img.shields.io/npm/v/react-awesome-scroll.svg?style=flat-square)](https://www.npmjs.com/package/react-awesome-scroll)

- Custom styled scrollbar with exact native behavior.
- Easily customisable
- No external dependencies
- Has 2 style presets out of the box: You can use it out of box or just with the styles needed for component to scroll content properly. (Or disable all of the styles and add them manually in your project stylesheet system).

[**Demo**](https://bananabobby.github.io/react-awesome-scroll/demo/)

## Installation

### npm
```bash
npm install react-awesome-scroll --save
```

### yarn
```bash
yarn add react-awesome-scroll
```

## Usage

### Basic

In order to use the component with it out-of-the-box design, you'll need to just call the component in your React app.
You will also need to limit the height of its wrapper, so that the component can get its size limits.

```javascript
import Scroll from 'react-awesome-scroll';

class CustomScroll extends Component {
  // Contains demo wrapper
  render() {
    return (
      <div style={{ height: 300 }}>
        <Scroll>
          /* Any content here */
        </Scroll>
      </div>
    );
  }
}
  
```

### Customised


```javascript
import Scroll from 'react-awesome-scroll';

class CustomScroll extends Component {
  // Contains demo wrapper
  render() {
    return (
      <div style={{ height: 300 }}>
        <Scroll
          className="scroll"
          containerClassName="scroll-container"
          innerClassName="scroll-inner"
          scrollClassName="scroll-track"
          barClassName="scroll-bar"
          barActiveClassName="scroll-bar-active"
          disableStyles
          disableUIStyles
        >
          /* Any content here */
        </Scroll>
      </div>
    );
  }
}
```
