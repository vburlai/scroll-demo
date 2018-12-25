import * as React from 'react'
import { API } from './data-model';
import Padding from './top-padding';
import LoadingIndicator from './loading-indicator';
import ListElement from './list-element';

import * as styles from './scrollable-area.css';

interface IProps extends API {
    className?: string,
}

interface IState {
    paddingTop: number,
    skipTop: number,
}

// Interval between updates
const INTERVAL_MS = 500

// Distance to loader less than
//    height * LOADER_SENSITIVITY
// triggers loadMore() prop
const LOADER_SENSITIVITY = 0.4

// How many px to show outside of scrollable area
const VISIBILITY_PX = 200

export default class ScrollableArea extends React.PureComponent<IProps, IState> {
    state: IState = {
        paddingTop: 0,
        skipTop: 0,
    }
    ref: React.RefObject<HTMLDivElement> = React.createRef()
    refBottom: React.RefObject<HTMLDivElement> = React.createRef()
    timerId: number
    offsets: number[] = []
    heights: number[] = []

    constructor(props: API) {
        super(props)
    }

    timer() {
        setTimeout(() => this.updatePaddingTop())
        setTimeout(() => this.loadMoreIfNeeded())
    }

    loadMoreIfNeeded() {
        const { top, height } = this.ref.current.getBoundingClientRect()
        const { top: loaderTop } = this.refBottom.current.getBoundingClientRect()

        if (loaderTop <= top + height * (1 + LOADER_SENSITIVITY)) {
            this.props.loadMore()
        }
    }

    updatePaddingTop() {
        const scrollTop = this.ref.current.scrollTop - VISIBILITY_PX
        const skipTop = this.offsets.findIndex(offset => offset > scrollTop)
        const heights = skipTop === -1 ? this.heights : this.heights.slice(0, skipTop)
        const paddingTop = heights.reduce((acc, h) => acc + h, 0)
        this.setState({ skipTop, paddingTop })
    }

    updateDimensions = (ind: number, offset: number, height: number) => {
        this.offsets[ind] = offset
        this.heights[ind] = height
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.timer(), INTERVAL_MS)
        this.props.loadMore()
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        const { className = '' } = this.props
        const { skipTop, paddingTop } = this.state
        const visibleList = skipTop === -1 ? [] : this.props.list.slice(skipTop)

        return (
            <div
                ref={this.ref}
                className={`${className} ${styles.container}`}
                style={{ position: 'relative' }} // for offsetTop to be counted from this DIV
            >
                <Padding height={paddingTop} />
                <React.Fragment>
                    {
                        visibleList.map(
                            (el, ind) =>
                                <ListElement
                                    key={ind + skipTop}
                                    id={ind + skipTop}
                                    element={el}
                                    reportDimensionsOnce={this.updateDimensions}
                                />
                        )
                    }
                </React.Fragment>
                <LoadingIndicator ref={this.refBottom} />
            </div>
        )
    }
}