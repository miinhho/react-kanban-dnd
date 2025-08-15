import styles from './App.module.css';
import TaskContainer from './components/TaskContainer';
import TaskForm from './components/TaskForm';
import { AppContext } from './context';

function App() {
  return (
    <AppContext>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1>📋 Kanban Board</h1>
          <TaskForm />
        </header>

        <TaskContainer />
        <TaskContainer.DragLayer />
      </div>
    </AppContext>
  );
}

export default App;