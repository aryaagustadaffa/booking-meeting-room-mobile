import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useLogin } from '../../hooks';
import { InputField, PrimaryButton } from '../../components';
import { validateEmail, validatePassword } from '../../utils';
import { useMainTabNavigation } from '@/navigation/useNavigation';

export const LoginScreen = () => {
  const theme = useAppTheme();
  const loginMutation = useLogin();
  const navigation = useMainTabNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      loginMutation.mutate(
        { email, password },
        {
          onSuccess: data => {
            // Navigation will be handled by auth state change
            console.log('data.user.role', data.user.role);
            if (data.user.role === 'ADMIN') {
              navigation.navigate('Admin');
            } else {
              navigation.navigate('Home');
            }
          },
          onError: (error: any) => {
            Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
          },
        }
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text
            style={[
              styles.logo,
              {
                color: theme.colors.primary,
                fontSize: theme.typography.fontSize.xxxxl,
              },
            ]}
          >
            🏢
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.onSurface,
                fontSize: theme.typography.fontSize.xl,
              },
            ]}
          >
            Meeting Room
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.onSurfaceVariant,
                fontSize: theme.typography.fontSize.md,
              },
            ]}
          >
            Booking System
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={<Text style={{ fontSize: 20 }}>📧</Text>}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={errors.password}
            leftIcon={<Text style={{ fontSize: 20 }}>🔒</Text>}
            rightIcon={<Text style={{ fontSize: 20 }}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <PrimaryButton
            title="Sign In"
            onPress={handleLogin}
            loading={loginMutation.isPending}
            fullWidth
            style={{ marginTop: theme.spacing.lg }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 48,
  },
  logo: {
    marginBottom: 16,
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontWeight: '400',
  },
  form: {
    width: '100%',
  },
});
