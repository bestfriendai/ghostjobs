import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface HistoryItem {
  id: string;
  title: string;
  company: string;
  scannedAt: string;
  ghostScore: number;
}

const mockHistory: HistoryItem[] = [
  { id: '1', title: 'UX Designer', company: 'CreativeLabs', scannedAt: '2 hours ago', ghostScore: 78 },
  { id: '2', title: 'Backend Developer', company: 'TechStart', scannedAt: 'Yesterday', ghostScore: 34 },
  { id: '3', title: 'Sales Representative', company: 'SalesForce Pro', scannedAt: '2 days ago', ghostScore: 95 },
  { id: '4', title: 'Project Manager', company: 'ManageCo', scannedAt: '3 days ago', ghostScore: 12 },
  { id: '5', title: 'Data Scientist', company: 'AI Innovations', scannedAt: '1 week ago', ghostScore: 56 },
];

export default function HistoryScreen() {
  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    const getScoreColor = (score: number) => {
      if (score >= 80) return '#EF4444';
      if (score >= 50) return '#F59E0B';
      return '#10B981';
    };

    const getScoreLabel = (score: number) => {
      if (score >= 80) return 'Ghost';
      if (score >= 50) return 'Suspicious';
      return 'Clean';
    };

    return (
      <TouchableOpacity style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <View style={styles.historyInfo}>
            <Text style={styles.historyTitle}>{item.title}</Text>
            <Text style={styles.historyCompany}>{item.company}</Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(item.ghostScore) }]}>
            <Text style={styles.scoreText}>{getScoreLabel(item.ghostScore)}</Text>
          </View>
        </View>
        <View style={styles.historyFooter}>
          <Text style={styles.scanTime}>🕐 {item.scannedAt}</Text>
          <Text style={styles.ghostScore}>{item.ghostScore}% ghost</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Jobs Scanned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#EF4444' }]}>5</Text>
          <Text style={styles.statLabel}>Ghost Jobs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#10B981' }]}>4</Text>
          <Text style={styles.statLabel}>Clean Jobs</Text>
        </View>
      </View>

      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Scan History</Text>}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No scan history yet</Text>
            <Text style={styles.emptyText}>Start scanning job postings to see them here</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#7C3AED',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  historyCompany: {
    fontSize: 13,
    color: '#6B7280',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scoreText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  ghostScore: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
