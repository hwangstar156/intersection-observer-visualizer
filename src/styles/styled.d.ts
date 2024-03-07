import 'styled-components';
import { colors } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
  }
}
