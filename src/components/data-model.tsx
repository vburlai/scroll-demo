import * as React from 'react'
import { Element, generator } from '../model/elements-generator'

export interface API {
    list: Array<Element>
    loadMore: () => Promise<{}>
}

interface IProps {
    children: (args: API) => React.ReactNode
}

interface IState {
    list: Array<Element>
}

const DEFAULT_CHUNK_SIZE = 5

const LATENCY_MS = 100
const TURNOVER_MS = 500

export default class DataModel extends React.PureComponent<IProps, IState> {
    state: IState = {
        list: []
    }
    iterator: Iterator<Element> = generator()
    loadMore = (done: () => void) => () => {
        const newElements = Array.from(
            { length: DEFAULT_CHUNK_SIZE },
            () => this.iterator.next().value
        )

        this.setState(({ list }) => ({
            list: list.concat(newElements)
        }), () => done())
    }
    loadMoreAsync = () => new Promise(
        (resolve) => setTimeout(
            this.loadMore(resolve),
            LATENCY_MS + TURNOVER_MS * Math.random()
        )
    )

    constructor(props: IProps) {
        super(props)
    }

    render() {
        const { list } = this.state
        return this.props.children({ list, loadMore: this.loadMoreAsync })
    }
}