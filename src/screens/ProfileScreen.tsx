import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store';
import { useLogout } from '../hooks';
import { PrimaryButton } from '../components';
import { useAppTheme } from '../hooks/useAppTheme';
import { AppTheme } from '../theme';

export const ProfileScreen = () => {
  const theme: AppTheme = useAppTheme();
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logoutMutation.mutate();
          },
        },
      ]
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.surface,
              borderBottomColor: theme.colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Avatar.Image size={80} source={{ uri: user.avatar }} />
            ) : (
              <Avatar.Text
                size={80}
                label={getInitials(user.name)}
                style={{ backgroundColor: theme.colors.primary }}
              />
            )}
          </View>

          <View style={styles.userInfo}>
            <Text
              style={[
                styles.userName,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: '700' as const,
                },
              ]}
            >
              {user.name}
            </Text>
            <Text
              style={[
                styles.userEmail,
                {
                  color: theme.colors.onSurfaceVariant,
                  fontSize: theme.typography.fontSize.md,
                },
              ]}
            >
              {user.email}
            </Text>
            <View
              style={[
                styles.roleBadge,
                {
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
            >
              <Text
                style={[
                  styles.roleText,
                  {
                    color: theme.colors.primary,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: '600' as const,
                    textTransform: 'uppercase' as const,
                  },
                ]}
              >
                {user.role}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <List.Section>
            <List.Item
              title="My Profile"
              description="View and edit your profile"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <Ionicons
                      name="person-outline"
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon="chevron-right"
                  color={theme.colors.outline}
                />
              )}
              onPress={() => {}}
              style={styles.listItem}
            />

            <List.Item
              title="Settings"
              description="App settings and preferences"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <Ionicons
                      name="settings-outline"
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon="chevron-right"
                  color={theme.colors.outline}
                />
              )}
              onPress={() => {}}
              style={styles.listItem}
            />

            <List.Item
              title="Help & Support"
              description="Get help and contact support"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <Ionicons
                      name="help-circle-outline"
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon="chevron-right"
                  color={theme.colors.outline}
                />
              )}
              onPress={() => {}}
              style={styles.listItem}
            />

            <List.Item
              title="About"
              description="App version and information"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <Ionicons
                      name="information-circle-outline"
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon="chevron-right"
                  color={theme.colors.outline}
                />
              )}
              onPress={() => {}}
              style={styles.listItem}
            />
          </List.Section>

          <Divider style={{ marginVertical: 16 }} />

          <PrimaryButton
            title="Logout"
            onPress={handleLogout}
            loading={logoutMutation.isPending}
            variant="outlined"
            fullWidth
            style={[
              styles.logoutButton,
              {
                borderColor: theme.colors.error,
              },
            ]}
            textStyle={{
              color: theme.colors.error,
            }}
            leftIcon={
              <Ionicons
                name="log-out-outline"
                size={20}
                color={theme.colors.error}
              />
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    marginBottom: 4,
  },
  userEmail: {
    marginBottom: 12,
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleText: {},
  content: {
    padding: 16,
  },
  listItem: {
    paddingVertical: 8,
  },
  logoutButton: {
    marginTop: 16,
  },
});
