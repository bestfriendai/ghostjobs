import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useJobStore } from '@/src/store/jobStore';
import type { Job } from '@/src/store/jobStore';

export default function JobsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const jobs = useJobStore((state) => state.jobs);

  const getGhostLevel = (score: number) => {
    if (score >= 80) return { label: 'LIKELY GHOST', color: '#EF4444' };
    if (score >= 50) return { label: 'SUSPICIOUS', color: '#F59E0B' };
    return { label: 'LEGIT', color: '#10B981' };
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  const renderJob = ({ item }: { item: Job }) => {
    const ghost = getGhostLevel(item.ghostScore);
    return (
      <TouchableOpacity
        style={styles.jobCard}
        onPress={() => router.push(`/job/${item.id}`)}
      >
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
          </View>
          <View style={[styles.ghostBadge, { backgroundColor: ghost.color }]}>
            <Text style={styles.ghostBadgeText}>{ghost.label}</Text>
          </View>
        </View>
        <View style={styles.jobDetails}>
          <Text style={styles.jobLocation}>📍 {item.location}</Text>
          <Text style={styles.jobDate}>📅 {item.postedDate}</Text>
          <Text style={styles.jobSource}>🔗 {item.source}</Text>
        </View>
        <View style={styles.scoreBar}>
          <View style={[styles.scoreFill, { width: `${item.ghostScore}%`, backgroundColor: ghost.color }]} />
        </View>
        <Text style={styles.scoreText}>Ghost Score: {item.ghostScore}%</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs or companies..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJob}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No scanned jobs yet. Start from the Scanner tab.</Text>
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  listContent: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#6B7280',
  },
  ghostBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ghostBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  jobLocation: {
    fontSize: 13,
    color: '#6B7280',
  },
  jobDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  jobSource: {
    fontSize: 13,
    color: '#6B7280',
  },
  scoreBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
