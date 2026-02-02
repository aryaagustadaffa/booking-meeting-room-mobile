import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useRegister } from '../../hooks';
import { InputField, PrimaryButton } from '../../components';
import { validateEmail, validatePassword } from '../../utils';

export const RegisterScreen = () => {
  const theme = useAppTheme();
  const registerMutation = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const passwordValidation = validatePassword(password);
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      registerMutation.mutate(
        { name, email, password },
        {
          onSuccess: () => {
            // Navigation will be handled by auth state change
          },
          onError: (error: any) => {
            Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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
            Create Account
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
            Join Meeting Room Booking System
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={errors.name}
            leftIcon={
              <Text style={{ fontSize: 20 }}>👤</Text>
            }
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={
              <Text style={{ fontSize: 20 }}>📧</Text>
            }
          />

          <InputField
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={errors.password}
            leftIcon={
              <Text style={{ fontSize: 20 }}>🔒</Text>
            }
            rightIcon={
              <Text style={{ fontSize: 20 }}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </Text>
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmPassword}
            leftIcon={
              <Text style={{ fontSize: 20 }}>🔒</Text>
            }
            rightIcon={
              <Text style={{ fontSize: 20 }}>
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </Text>
            }
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <PrimaryButton
            title="Create Account"
            onPress={handleRegister}
            loading={registerMutation.isPending}
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
    marginTop: 40,
    marginBottom: 32,
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
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
});
