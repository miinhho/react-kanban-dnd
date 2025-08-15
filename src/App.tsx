import styles from './App.module.css';
import TaskContainer from './components/TaskContainer';
import TaskForm from './components/TaskForm';
import { AppContext } from './context';

const App = () => {
  return (
    <AppContext>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1>📋 칸반 보드</h1>
          <TaskForm />
        </header>

        <TaskContainer />
        <TaskContainer.DragLayer />
      </div>
    </AppContext>
  );
}

export default App;