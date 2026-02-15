import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const packages = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$4.99',
    period: '/month',
    features: ['Unlimited scans', 'Priority support', 'No ads'],
    popular: false,
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '$29.99',
    period: '/year',
    features: ['Everything in Monthly', 'Save 50%', 'Early access features'],
    popular: true,
  },
];

export default function PaywallScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('annual');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.badge}>🔓 PRO</Text>
          <Text style={styles.title}>Unlock GhostJobs Pro</Text>
          <Text style={styles.subtitle}>
            Stop wasting time on fake job postings. Get unlimited access to our
            powerful ghost job detection tools.
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Unlimited job scans</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Browser extension</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Historical scan data</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Export results</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Priority support</Text>
          </View>
        </View>

        <View style={styles.packages}>
          {packages.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageCard,
                selected === pkg.id && styles.packageCardSelected,
                pkg.popular && styles.packageCardPopular,
              ]}
              onPress={() => setSelected(pkg.id)}
            >
              {pkg.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>BEST VALUE</Text>
                </View>
              )}
              <Text style={styles.packageName}>{pkg.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
                <Text style={styles.packagePeriod}>{pkg.period}</Text>
              </View>
              <View style={styles.featuresList}>
                {pkg.features.map((feature, i) => (
                  <Text key={i} style={styles.packageFeature}>
                    • {feature}
                  </Text>
                ))}
              </View>
              <View
                style={[
                  styles.checkCircle,
                  selected === pkg.id && styles.checkCircleSelected,
                ]}
              >
                {selected === pkg.id && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.restoreButton}>
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          Subscription automatically renews unless cancelled.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badge: {
    backgroundColor: '#7C3AED',
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
  },
  features: {
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    color: '#10B981',
    fontSize: 18,
    marginRight: 12,
    fontWeight: '700',
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
  },
  packages: {
    gap: 16,
    marginBottom: 24,
  },
  packageCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  packageCardSelected: {
    borderColor: '#7C3AED',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
  },
  packageCardPopular: {
    borderColor: '#7C3AED',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  packageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  packagePrice: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  packagePeriod: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  featuresList: {
    gap: 4,
  },
  packageFeature: {
    color: '#D1D5DB',
    fontSize: 13,
  },
  checkCircle: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4B5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  checkMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  subscribeButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  restoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  restoreButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  terms: {
    color: '#6B7280',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
