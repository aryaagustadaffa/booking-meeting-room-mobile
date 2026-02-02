import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store';
import { useMainTabNavigation } from '../navigation';

export const ProfileHeader: React.FC = () => {
  const theme = useAppTheme();
  const navigation = useMainTabNavigation();
  const { user } = useAuthStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  if (!user) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.xl,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: theme.elevation.sm,
          padding: theme.spacing.md,
        },
      ]}
      onPress={handleProfilePress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={[
              styles.avatar,
              {
                width: 48,
                height: 48,
                borderRadius: 24,
              },
            ]}
          />
        ) : (
          <View
            style={[
              styles.avatar,
              styles.avatarPlaceholder,
              {
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: theme.colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                {
                  color: theme.colors.onPrimary,
                  fontSize: theme.typography.fontSize.md,
                  fontWeight: '600' as const,
                },
              ]}
            >
              {getInitials(user.name)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.greeting,
            {
              color: theme.colors.onSurface,
              fontSize: theme.typography.fontSize.md,
              marginBottom: 2,
            },
          ]}
        >
          Hi, {user.name.split(' ')[0]} 👋
        </Text>
        <Text
          style={[
            styles.email,
            {
              color: theme.colors.onSurfaceVariant,
              fontSize: theme.typography.fontSize.sm,
            },
          ]}
          numberOfLines={1}
        >
          {user.email}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.onSurfaceVariant}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    backgroundColor: '#4CAF50',
  },
  avatarText: {
    color: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontWeight: '600',
  },
  email: {
    fontWeight: '400',
  },
});
