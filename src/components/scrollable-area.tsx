import * as React from 'react'
import { API } from './data-model';
import TopPadding from './top-padding';
import LoadingIndicator from './loading-indicator';
import ListElement from './list-element';

import * as styles from './scrollable-area.css';

interface IProps extends API {
    className?: string,
}

interface IState {
    paddingTop: number,
}

// Distance to loader less than
//    height * LOADER_SENSITIVITY
// triggers loadMore() prop
const LOADER_SENSITIVITY = 0.1

export default class ScrollableArea extends React.PureComponent<IProps, IState> {
    state: IState
    addPadding: (height: number) => void
    ref: React.RefObject<HTMLDivElement>
    refBottom: React.RefObject<HTMLDivElement>
    timerId: number
    scrollTop: number

    constructor(props: API) {
        super(props)
        this.state = {
            paddingTop: 0,
        }
        this.ref = React.createRef()
        this.refBottom = React.createRef()
        this.addPadding = (height: number) => {
            this.setState(({ paddingTop }) => ({
                paddingTop: paddingTop + height
            }))
        }
        this.timerId = setInterval(() => this.timer(), 1000)
        this.scrollTop = 0
    }

    timer() {
        setTimeout(() => this.updateScrollTop())
        setTimeout(() => this.loadMoreIfNeeded())
    }

    loadMoreIfNeeded() {
        const { top, height } = this.ref.current.getBoundingClientRect()
        const { top: loaderTop } = this.refBottom.current.getBoundingClientRect()

        if (loaderTop <= top + height * (1 + LOADER_SENSITIVITY)) {
            this.props.loadMore()
        }
    }

    updateScrollTop() {
        const { scrollTop } = this.ref.current
        this.scrollTop = scrollTop
    }

    componentDidMount() {
        this.props.loadMore()
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        const { className = '' } = this.props;


        return (
            <div ref={this.ref} className={`${className} ${styles.container}`}>
                <TopPadding height={this.state.paddingTop} />
                <React.Fragment>
                    {
                        this.props.list.map(
                            (el, ind) =>
                                <ListElement
                                    key={ind}
                                    id={ind}
                                    element={el}
                                    addPadding={this.addPadding}
                                />
                        )
                    }
                </React.Fragment>
                <LoadingIndicator ref={this.refBottom} />
            </div>
        )
    }
}