import styled from 'styled-components';
import TaskBoard from './components/taskList/TaskBoard';
import { QueryClientProvider } from 'react-query';
import { getClient } from './queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
const App = () => {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TaskBoard />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
