import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function BottomSheet({ professional, onClose, onNavigate }) {
  if (!professional) return null;

  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      
      <View style={styles.header}>
        <Image 
          source={{ uri: `https://picsum.photos/seed/${professional.id}/150/150` }} 
          style={styles.avatar} 
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{professional.name}</Text>
          <Text style={styles.profession}>{professional.profession}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingIcon}>★</Text>
          <Text style={styles.ratingText}>{professional.rating}</Text>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>💼</Text>
          <Text style={styles.statText}>{professional.jobs} trabajos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>📍</Text>
          <Text style={styles.statText}>{professional.distance}</Text>
        </View>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{professional.price_level}</Text>
        </View>
      </View>

      <View style={styles.responseBox}>
        <Text style={styles.responseIcon}>⏱</Text>
        <Text style={styles.responseText}>{professional.response_time}</Text>
      </View>

      <TouchableOpacity style={styles.ctaButton} onPress={onNavigate} activeOpacity={0.8}>
        <Text style={styles.ctaText}>Ver perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90, // Above bottom tabs
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  handle: {
    width: 48,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  avatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    marginRight: 16,
    backgroundColor: '#F3F4F6'
  },
  headerText: { 
    flex: 1 
  },
  name: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#000000',
    marginBottom: 4
  },
  profession: { 
    fontSize: 15, 
    color: '#6B7280' 
  },
  ratingBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#F3F4F6' 
  },
  ratingIcon: {
    color: '#000000',
    fontSize: 14,
    marginRight: 4
  },
  ratingText: { 
    fontWeight: '700', 
    color: '#000000',
    fontSize: 14
  },
  statsRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    gap: 16 
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 14,
    marginRight: 6
  },
  statText: { 
    color: '#6B7280', 
    fontSize: 14,
    fontWeight: '500'
  },
  priceBadge: { 
    backgroundColor: '#F9FAFB', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  priceText: {
    fontWeight: '600', 
    color: '#000000',
    fontSize: 14
  },
  responseBox: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 61, 145, 0.05)', 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 24, 
    borderWidth: 1, 
    borderColor: 'rgba(11, 61, 145, 0.1)' 
  },
  responseIcon: {
    fontSize: 16,
    marginRight: 8
  },
  responseText: { 
    color: '#0B3D91', 
    fontWeight: '600', 
    fontSize: 14 
  },
  ctaButton: { 
    backgroundColor: '#0B3D91', 
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center' 
  },
  ctaText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700' 
  }
});
