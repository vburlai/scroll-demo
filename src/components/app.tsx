import * as React from 'react'

import * as styles from './app.css'
import ErrorBoundary from './error-boundary';
import DataModel from './data-model';
import ScrollableArea from './scrollable-area'
import { API } from './data-model'

const scrollableAreaWrapper = ({ list, loadMore }: API) =>
  <ScrollableArea
    list={list}
    loadMore={loadMore}
    className={styles.flexible}
  />

export default function App() {
  return (
    <div className={`${styles.container}`}>
      <h1>Infinite Scroll demo</h1>
      <ErrorBoundary>
        <DataModel>
          {scrollableAreaWrapper}
        </DataModel>
      </ErrorBoundary>
    </div>
  )
}