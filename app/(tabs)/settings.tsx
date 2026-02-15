import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Alert, Linking } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const SettingRow = ({
    title,
    subtitle,
    value,
    onToggle,
  }: {
    title: string;
    subtitle?: string;
    value: boolean;
    onToggle: (val: boolean) => void;
  }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E7EB', true: '#A78BFA' }}
        thumbColor={value ? '#7C3AED' : '#F9FAFB'}
      />
    </View>
  );

  const ActionRow = ({
    title,
    icon,
    onPress,
    danger = false,
  }: {
    title: string;
    icon: string;
    onPress: () => void;
    danger?: boolean;
  }) => (
    <TouchableOpacity style={styles.actionRow} onPress={onPress}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={[styles.actionTitle, danger && styles.actionTitleDanger]}>
        {title}
      </Text>
      <Text style={styles.actionArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Guest User</Text>
          <Text style={styles.profilePlan}>Free Plan</Text>
        </View>
        <TouchableOpacity style={styles.upgradeButton} onPress={() => router.push('/paywall')}>
          <Text style={styles.upgradeButtonText}>Upgrade</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <SettingRow
            title="Push Notifications"
            subtitle="Get alerts for new scan results"
            value={notifications}
            onToggle={setNotifications}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scanning</Text>
        <View style={styles.card}>
          <SettingRow
            title="Auto-Scan Links"
            subtitle="Automatically scan links in emails"
            value={autoScan}
            onToggle={setAutoScan}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.card}>
          <SettingRow
            title="Dark Mode"
            subtitle="Use dark theme"
            value={darkMode}
            onToggle={setDarkMode}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <ActionRow title="Restore Purchases" icon="🔄" onPress={() => Alert.alert('Restore', 'This would restore purchases from your account')} />
          <ActionRow title="Privacy Policy" icon="📜" onPress={() => Linking.openURL('https://example.com/privacy')} />
          <ActionRow title="Terms of Service" icon="📋" onPress={() => Linking.openURL('https://example.com/terms')} />
          <ActionRow title="Contact Support" icon="💬" onPress={() => Linking.openURL('mailto:support@ghostjobs.app')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <View style={styles.card}>
          <ActionRow
            title="Clear All Data"
            icon="🗑️"
            danger
            onPress={() => Alert.alert('Clear Data', 'Are you sure you want to delete all your data?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => {} },
            ])}
          />
        </View>
      </View>

      <Text style={styles.version}>GhostJobs v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  profilePlan: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '600',
  },
  upgradeButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  actionTitle: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  actionTitleDanger: {
    color: '#EF4444',
  },
  actionArrow: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 16,
    marginBottom: 32,
  },
});
