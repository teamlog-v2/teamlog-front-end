import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
const  TaskContainer = loadable(() => import('./task/TaskContainer'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/task" />
      <Route path="/task" component={TaskContainer} />
    </Switch>
  )
}
export default App;