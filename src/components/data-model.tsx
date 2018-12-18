import * as React from 'react'
import { Element, generator } from '../model/elements-generator'

export interface API {
    list: Array<Element>
    loadMore: () => void
}

interface IProps {
    children: (args: API) => React.ReactNode
}

interface IState {
    list: Array<Element>
}

const DEFAULT_CHUNK_SIZE = 5

export default class DataModel extends React.Component<IProps, IState> {
    state: IState
    iterator: Iterator<Element>
    loadMore: () => void

    constructor(props: IProps) {
        super(props)
        this.state = {
            list: []
        }
        this.iterator = generator()
        this.loadMore = () => {
            const newElements = Array.from(
                { length: DEFAULT_CHUNK_SIZE },
                () => this.iterator.next().value
            )

            this.setState(({ list }) => ({
                list: list.concat(newElements)
            }))
        }
    }

    render() {
        const { list } = this.state
        return this.props.children({ list, loadMore: this.loadMore })
    }
}