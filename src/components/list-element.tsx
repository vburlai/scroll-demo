import * as React from 'react'
import { Element } from '../model/elements-generator';

import * as styles from './list-element.css';

interface IProps {
    id: number
    element: Element
    addPadding: (height: number) => void
}

export default class ListElement extends React.Component {
    top: number
    height: number
    ref: React.RefObject<HTMLDivElement>
    props: IProps

    constructor(props: IProps) {
        super(props)
        this.top = 0
        this.height = 0
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.top = this.ref.current.offsetTop
        this.height = this.ref.current.clientHeight
    }

    render() {
        const { letter, options } = this.props.element;

        return (
            <div ref={this.ref} className={styles.element}>
                <div className={styles.letter}>{letter}</div>
                <ul className={styles.list}>
                    {options.map(value => <li key={value}>{value}</li>)}
                </ul>
            </div>
        )
    }
}