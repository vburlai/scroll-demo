import * as React from 'react'

interface IProps {
    children: React.ReactElement<any>
}

interface IState {
    hasError: boolean
}

export default class ErrorBoundary extends React.PureComponent<IProps, IState> {
    state: IState = { hasError: false }
    props: IProps

    constructor(props: IProps) {
        super(props);
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true }
    }

    componentDidCatch(error: any, info: any) {
        console.log(error)
        console.log(info)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}