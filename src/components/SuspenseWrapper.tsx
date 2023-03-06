import { Suspense } from 'react';
import Loading from './Loading';

const SuspenseWrapper = ({ children }: { children: JSX.Element | undefined }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
export default SuspenseWrapper;
