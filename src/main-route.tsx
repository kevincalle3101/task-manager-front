import { lazy, Suspense } from 'react'
import {  Route, Switch } from 'wouter'

import { TASK_ROUTES } from './routes'
import Home from './views/Home'
import PageNotFound from './views/PageNotFound'

const TaskForm = lazy(() => import('./views/TaskForm'))

export const Routes = () => {
   
  return (
    <div>
      <Suspense >
        <Switch>
          <Route path={TASK_ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={TASK_ROUTES.FORM}>
            <TaskForm />
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}
