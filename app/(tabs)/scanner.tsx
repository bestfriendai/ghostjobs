import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

type Platform = 'indeed' | 'linkedin' | 'ziprecruiter' | 'glassdoor';

interface ScanResult {
  id: string;
  url: string;
  platform: Platform;
  status: 'scanning' | 'clean' | 'ghost';
  ghostScore?: number;
}

export default function ScannerScreen() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);

  const platforms: { id: Platform; name: string; icon: string }[] = [
    { id: 'indeed', name: 'Indeed', icon: '💼' },
    { id: 'linkedin', name: 'LinkedIn', icon: '🔗' },
    { id: 'ziprecruiter', name: 'ZipRecruiter', icon: '📋' },
    { id: 'glassdoor', name: 'Glassdoor', icon: '🚪' },
  ];

  const handleScan = async () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a job posting URL');
      return;
    }

    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 100);
      const newResult: ScanResult = {
        id: Date.now().toString(),
        url: url,
        platform: 'indeed',
        status: mockScore > 60 ? 'ghost' : 'clean',
        ghostScore: mockScore,
      };
      setResults([newResult, ...results]);
      setIsScanning(false);
      setUrl('');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ghost':
        return '#EF4444';
      case 'clean':
        return '#10B981';
      default:
        return '#F59E0B';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ghost':
        return '⚠️ Likely Ghost Job';
      case 'clean':
        return '✅ Appears Legitimate';
      default:
        return '🔄 Scanning...';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Job Scanner</Text>
        <Text style={styles.subtitle}>Paste a job posting URL to check if it's a ghost job</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.urlInput}
          placeholder="https://www.indeed.com/job/..."
          placeholderTextColor="#9CA3AF"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
          onPress={handleScan}
          disabled={isScanning}
        >
          <Text style={styles.scanButtonText}>
            {isScanning ? '⏳ Scanning...' : '🔍 Scan'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.platformsSection}>
        <Text style={styles.sectionTitle}>Quick Scan</Text>
        <View style={styles.platformGrid}>
          {platforms.map((platform) => (
            <TouchableOpacity key={platform.id} style={styles.platformCard}>
              <Text style={styles.platformIcon}>{platform.icon}</Text>
              <Text style={styles.platformName}>{platform.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {results.length > 0 && (
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Scan Results</Text>
          {results.map((result) => (
            <View key={result.id} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultUrl} numberOfLines={1}>
                  {result.url}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(result.status) },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {getStatusText(result.status)}
                  </Text>
                </View>
              </View>
              {result.ghostScore !== undefined && (
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>Ghost Probability:</Text>
                  <View style={styles.scoreBar}>
                    <View
                      style={[
                        styles.scoreFill,
                        {
                          width: `${result.ghostScore}%`,
                          backgroundColor:
                            result.ghostScore > 60 ? '#EF4444' : '#10B981',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.scoreValue}>{result.ghostScore}%</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      <View style={styles.premiumSection}>
        <View style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>🔓 Premium</Text>
          <Text style={styles.premiumText}>
            Get unlimited scans, historical data, and browser extension
          </Text>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={() => router.push('/paywall')}
          >
            <Text style={styles.premiumButtonText}>Upgrade to Pro</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  urlInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scanButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  scanButtonDisabled: {
    opacity: 0.6,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  platformsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  platformCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  platformIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  platformName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  resultsSection: {
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultHeader: {
    marginBottom: 12,
  },
  resultUrl: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    width: 40,
    textAlign: 'right',
  },
  premiumSection: {
    marginBottom: 24,
  },
  premiumCard: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    padding: 20,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  premiumText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    lineHeight: 20,
  },
  premiumButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  premiumButtonText: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '700',
  },
});
