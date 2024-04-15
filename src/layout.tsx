import { CurrentIdProvider } from './manager/context/currentId';
import { IdMapProvider } from './manager/context/idMap';
import { CurrentTabProvider } from './manager/context/tab';
import { ToggleProvider } from './manager/context/toggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <CurrentIdProvider>
      <IdMapProvider>
        <ToggleProvider>
          <CurrentTabProvider>{children}</CurrentTabProvider>
        </ToggleProvider>
      </IdMapProvider>
    </CurrentIdProvider>
  );
};
