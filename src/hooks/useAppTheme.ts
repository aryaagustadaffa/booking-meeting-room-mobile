import { useTheme as usePaperTheme } from 'react-native-paper';
import { lightTheme, darkTheme, AppTheme } from '../theme';

export const useAppTheme = (): AppTheme => {
  const paperTheme = usePaperTheme();
  // Return our custom theme which extends MD3Theme
  return paperTheme.dark ? darkTheme : lightTheme;
};
