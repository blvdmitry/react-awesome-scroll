import React, { PropTypes } from 'react';
import b from 'b_';

class Scrollbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDragging: false,
			trackPosition: props.trackPosition || 0
		};

		this._startDragMousePosition = null;
		this._startDragPosition = null;

		this._elems = {
			parent: null,
			track: null
		};

		this.onClick = this.onClick.bind(this);
		this.onTrackMouseDown = this.onTrackMouseDown.bind(this);
		this.onHandleDrag = this.onHandleDrag.bind(this);
		this.onHandleDragEnd = this.onHandleDragEnd.bind(this);
		this.scrollToPosition = this.scrollToPosition.bind(this);
		this.limitTrackPosition = this.limitTrackPosition.bind(this);
	}

	componentWillReceiveProps({ trackPosition }) {
		if (this.props.trackPosition !== trackPosition) {
			this.setState({ trackPosition });
		}
	}

	onClick(event) {
		if (!this.state.isDragging && event.target !== this._elems.track) {
			this.scrollToPosition(event.pageY);
		}
		event.preventDefault();
	}

	onTrackMouseDown(event) {
		this._startDragMousePosition = event.pageY;
		this._startDragPosition = this.state.trackPosition;
		this.setState({ isDragging: true });

		document.addEventListener('mousemove', this.onHandleDrag);
		document.addEventListener('mouseup', this.onHandleDragEnd);
	}

	onHandleDrag(event) {
		if (this.state.isDragging) {
			this.scrollToPosition(this._startDragPosition + event.pageY - this._startDragMousePosition);
		}

		event.preventDefault();
	}

	onHandleDragEnd() {
		this.setState({ isDragging: false })
	}

	/**
	 * Update track position state
	 * @param position
	 */
	scrollToPosition(position) {
		let limitedPosition = this.limitTrackPosition(position);

		if (this.props.scrollHandler) {
			this.props.scrollHandler(limitedPosition);
		}
		this.setState({ trackPosition: limitedPosition });
	}

	/**
	 * Return position according to scrollbar sizes
	 * @param position
	 * @returns {number}
	 */
	limitTrackPosition(position) {
		return Math.max(0, Math.min(position, this._elems.parent.offsetHeight - this._elems.track.offsetHeight));
	}

	render() {
		return (
			<div
				className="scrollbar"
				ref={c => this._elems.parent = c}
				onClick={this.onClick}
			>
				<div
					className={b('scrollbar', 'track', { active: this.state.isDragging })}
					onMouseDown={this.onTrackMouseDown}
					style={{
						height: this.props.trackHeight,
						top: this.state.trackPosition
					}}
					ref={c => this._elems.track = c}
				/>
			</div>
		)
	}
}

Scrollbar.propTypes = {
	trackHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	trackPosition: PropTypes.number,

	scrollHandler: PropTypes.func
};

export default Scrollbar;