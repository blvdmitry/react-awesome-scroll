import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import b from 'b_';

import Scrollbar from '../Scrollbar/Scrollbar';

class Scroll extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasScroll: true,
			isDragging: false,
			scrollRatio: null,
			scrollPosition: 0,

			// Ratio of container and scrollbar heights
			heightRatio: null
		};

		this._elems = {
			parent: null,
			container: null,
			inner: null,
			scrollbar: null
		};

		this.toggleScroll = this.toggleScroll.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.scrollHandler = this.scrollHandler.bind(this);
	}

	componentDidMount() {
		this.toggleScroll();
		window.addEventListener('resize', this.toggleScroll);
	}

	onScroll(event) {
		this.setState({ scrollPosition: this.state.heightRatio * this._elems.container.scrollTop });
	}

	scrollHandler(position) {
		this._elems.container.scrollTop = position / this.state.heightRatio;
	}

	/**
	 * Show/hide scroll based on ratio of containers
	 */
	toggleScroll() {
		let scrollbar = this._elems.scrollbar;
		let ratio = this._elems.parent.offsetHeight / this._elems.inner.offsetHeight;
		this.setState({
			hasScroll: ratio < 1,
			scrollRatio: ratio,
			heightRatio: scrollbar && (scrollbar.offsetHeight / this._elems.inner.offsetHeight)
		});
	}

	render() {
		return (
			<div
				className={b('scroll', this.props.mods)}
				ref={c => this._elems.parent = c}
			>
				<div
					className="scroll__container"
					ref={c => this._elems.container = c}
					onScroll={this.onScroll}
				>
					<div
						className="scroll__inner"
						ref={c => this._elems.inner = c}
					>
						{ this.props.children }
					</div>
				</div>

				{
					this.state.hasScroll && (
						<Scrollbar
							scrollHandler={this.scrollHandler}
							ref={c => this._elems.scrollbar = ReactDOM.findDOMNode(c)}
							trackHeight={`${this.state.scrollRatio * 100}%`}
							trackPosition={Math.floor(this.state.scrollPosition)}
						/>
					)
				}
			</div>
		);
	}
};

Scroll.propTypes = {
		mods: PropTypes.object
};

export default Scroll;