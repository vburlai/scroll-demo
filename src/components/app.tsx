import * as React from 'react'

import * as styles from './app.css'
import ErrorBoundary from './error-boundary';
import DataModel from './data-model';
import ScrollableArea from './scrollable-area'
import { API } from './data-model'

export default function App() {
    return (
        <div className={`${styles.container}`}>
            <h1>Infinite Scroll demo</h1>
            <ErrorBoundary>
                <DataModel>
                    {
                        ({ list, loadMore }: API) =>
                            <ScrollableArea
                                list={list}
                                loadMore={loadMore}
                                className={styles.flexible}
                            />
                    }
                </DataModel>
            </ErrorBoundary>
        </div>
    )
}