import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../hooks/useAppTheme';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  backgroundColor?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = '🏢 Meeting Room',
  subtitle = 'Booking System',
  showBackButton = false,
  onBackPress = () => {},
  rightAction,
  backgroundColor,
}) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  const headerBackgroundColor = backgroundColor || theme.colors.surface;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: headerBackgroundColor,
          paddingTop: insets.top,
          borderBottomColor: theme.colors.outlineVariant,
        },
      ]}
    >
      <Appbar.Header
        style={{
          backgroundColor: 'transparent',
          elevation: 0,
        }}
      >
        {showBackButton ? (
          <Appbar.BackAction onPress={onBackPress} />
        ) : (
          <View style={styles.spacer} />
        )}

        <View style={styles.titleContainer}>
          <Appbar.Content
            title={title}
            subtitle={subtitle}
            titleStyle={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: '700' as const,
              color: theme.colors.onSurface,
            }}
            subtitleStyle={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.onSurfaceVariant,
            }}
          />
        </View>

        {rightAction ? (
          <View style={styles.rightAction}>{rightAction}</View>
        ) : (
          <View style={styles.spacer} />
        )}
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  spacer: {
    width: 48,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightAction: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
