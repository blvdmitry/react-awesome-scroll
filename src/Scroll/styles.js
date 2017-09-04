export default {
  root: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
  },
  container: {
    paddingRight: 115,
    marginRight: -100,
    overflow: 'auto',
    maxHeight: '100%',
    position: 'relative',
  },
  inner: {
    position: 'relative',
  },
  scroll: {
    position: 'absolute',
    right: 5,
    width: 5,
    top: 10,
    bottom: 10,
    background: 'rgba(0, 0, 0, .1)',
    borderRadius: 3,
    cursor: 'pointer',
  },
  bar: {
    background: '#333',
    opacity: 0.3,
    minHeight: 25,
    height: 0,
    borderRadius: 3,
    position: 'relative',
    userSelect: 'none',
  },
};
