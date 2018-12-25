import * as React from 'react'
import { Element } from '../model/elements-generator';

import * as styles from './list-element.css';

interface IProps {
    id: number
    element: Element
    reportDimensionsOnce: (id: number, offset: number, height: number) => void
}

export default class ListElement extends React.PureComponent {
    ref: React.RefObject<HTMLDivElement>
    props: IProps

    constructor(props: IProps) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        const { offsetTop } = this.ref.current
        const { height } = this.ref.current.getBoundingClientRect()
        this.props.reportDimensionsOnce(this.props.id, offsetTop, height)
    }

    render() {
        const { letter, options } = this.props.element;

        return (
            <div ref={this.ref} className={styles.wrapper}>
                <div className={styles.element}>
                    <div className={styles.letter}>{letter}</div>
                    <ul className={styles.list}>
                        {options.map(value => <li key={value}>{value}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}