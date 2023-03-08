import TaskBoard from './components/taskList/TaskBoard';
import { QueryClientProvider } from 'react-query';
import { getClient } from './queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalWrapper from './components/modal/ModalWrapper';
import useSearchParams from './hooks/useSearchParams';
import { Suspense } from 'react';
import Loading from './components/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorIndicator from './components/ErrorIndicator';

const App = () => {
  const queryClient = getClient();
  const { mode } = useSearchParams(['mode']);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorIndicator}>
        <Suspense fallback={<Loading />}>
          <TaskBoard />
        </Suspense>
      </ErrorBoundary>
      {mode && <ModalWrapper />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
