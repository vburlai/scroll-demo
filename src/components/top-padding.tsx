import * as React from 'react'

interface IProps {
    height: number
}

export default function Padding(props: IProps) {
    return (
        <div style={{ height: `${props.height}px` }} />
    )
}