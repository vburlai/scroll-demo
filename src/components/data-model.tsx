import * as React from 'react'
import { Element, generator } from '../model/elements-generator'

export interface API {
    list: Array<Element>
    loadMore: () => Promise<void>
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

export default class DataModel extends React.Component<IProps, IState> {
    state: IState
    iterator: Iterator<Element>
    loadMore: () => Promise<void>

    constructor(props: IProps) {
        super(props)
        this.state = {
            list: []
        }
        this.iterator = generator()
        const loadMore = (done: () => void) => () => {
            const newElements = Array.from(
                { length: DEFAULT_CHUNK_SIZE },
                () => this.iterator.next().value
            )

            this.setState(({ list }) => ({
                list: list.concat(newElements)
            }), done)
        }
        this.loadMore = () => new Promise(
            (resolve) => setTimeout(
                loadMore(resolve),
                LATENCY_MS + TURNOVER_MS * Math.random()
            )
        )
    }

    render() {
        const { list } = this.state
        return this.props.children({ list, loadMore: this.loadMore })
    }
}