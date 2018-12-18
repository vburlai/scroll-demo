import * as React from 'react'
import * as styles from './loading-indicator.css';

interface IProps {}

const LoadingIndicator = React.forwardRef(
    (props: IProps, ref: React.Ref<HTMLDivElement>) =>
        <div className={styles.indicator} ref={ref}>Loading...</div>
)

export default LoadingIndicator
