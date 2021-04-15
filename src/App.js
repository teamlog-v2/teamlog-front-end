import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import ProjectListContainer from './/project/ProjectListContainer';

const  TaskContainer = loadable(() => import('./task/TaskContainer'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/project" />
      <Route path="/task" component={TaskContainer} />
      <Route path="/project" component={ProjectListContainer}/>
    </Switch>
  )
}
export default App;