import { CurrentIdProvider } from './manager/context/currentId';
import { IdMapProvider } from './manager/context/idMap';
import { TabProvider } from './manager/context/tab';
import { ToggleProvider } from './manager/context/toggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <CurrentIdProvider>
      <IdMapProvider>
        <ToggleProvider>
          <TabProvider>{children}</TabProvider>
        </ToggleProvider>
      </IdMapProvider>
    </CurrentIdProvider>
  );
};
