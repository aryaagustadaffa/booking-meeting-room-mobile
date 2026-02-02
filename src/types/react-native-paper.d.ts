import { MD3Theme } from 'react-native-paper';
import { spacing, borderRadius, elevation, typography } from '../theme/spacing';

declare module 'react-native-paper' {
  interface MD3Theme {
    spacing: typeof spacing;
    borderRadius: typeof borderRadius;
    elevation: typeof elevation;
    typography: typeof typography;
    colors: MD3Theme['colors'] & {
      status: {
        pending: string;
        confirmed: string;
        cancelled: string;
        rejected: string;
      };
    };
  }
}
