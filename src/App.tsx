import TaskBoard from './components/taskList/TaskBoard';
import { QueryClientProvider, useQueryErrorResetBoundary } from 'react-query';
import { getClient } from './queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalWrapper from './components/modal/ModalWrapper';
import useSearchParams from './hooks/useSearchParams';
import { Suspense } from 'react';
import Loading from './components/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorIndicator from './components/ErrorIndicator';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from 'styled-components';
import useTheme from './hooks/useTheme';
import GlobalStyle from './style/globalStyle';
const App = () => {
  const queryClient = getClient();
  const { mode } = useSearchParams(['mode']);
  const { reset } = useQueryErrorResetBoundary();
  const theme = useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => <ErrorIndicator onClickHandler={() => resetErrorBoundary()} />}
        >
          <Suspense fallback={<Loading />}>
            <TaskBoard />
          </Suspense>
        </ErrorBoundary>
        <ThemeToggle />
        {mode && <ModalWrapper />}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
