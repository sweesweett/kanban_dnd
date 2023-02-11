import TaskBoard from './components/taskList/TaskBoard';
import { QueryClientProvider } from 'react-query';
import { getClient } from './queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalWrapper from './components/modal/ModalWrapper';
import useSearchParams from './hooks/useSearchParams';

const App = () => {
  const queryClient = getClient();
  const { mode } = useSearchParams(['mode']);

  return (
    <QueryClientProvider client={queryClient}>
      <TaskBoard />
      {mode && <ModalWrapper />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
