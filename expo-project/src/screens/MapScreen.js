import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from '../components/BottomSheet';
import { professionals } from '../data/mockProfessionals';

const INITIAL_REGION = {
  latitude: -34.5862, // Palermo/Recoleta area
  longitude: -58.4051,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

export default function MapScreen({ navigation }) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [selectedPro, setSelectedPro] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onPress={() => setSelectedPro(null)}
        mapPadding={{ top: 100, right: 0, bottom: 0, left: 0 }}
      >
        {professionals.map((pro) => (
          <Marker
            key={pro.id}
            coordinate={pro.coordinates}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedPro(pro);
              // Optional: center map on selected marker
              mapRef.current?.animateToRegion({
                ...pro.coordinates,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }, 500);
            }}
          >
            <View style={[
              styles.marker, 
              pro.type === 'premium_black' ? styles.markerPremium : styles.markerStandard,
              selectedPro?.id === pro.id && styles.markerSelected
            ]}>
              <Text style={styles.markerText}>{pro.profession.charAt(0)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Search Bar */}
      <SafeAreaView style={styles.searchContainer} pointerEvents="box-none">
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            placeholder="¿Qué necesitás? (plomero, gasista...)"
            style={styles.searchInput}
            placeholderTextColor="#6B7280"
          />
          <View style={styles.divider} />
          <TouchableOpacity>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Location Button */}
      <TouchableOpacity 
        style={[styles.locationButton, { bottom: selectedPro ? 380 : 100 }]} 
        onPress={centerOnUser}
        activeOpacity={0.8}
      >
        <Text style={styles.locationIcon}>📍</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet 
        professional={selectedPro} 
        onClose={() => setSelectedPro(null)}
        onNavigate={() => {
          // navigation.navigate('Profile', { id: selectedPro.id })
          alert(`Navigating to ${selectedPro.name}'s profile`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  map: { 
    width: '100%', 
    height: '100%' 
  },
  searchContainer: { 
    position: 'absolute', 
    top: Platform.OS === 'ios' ? 50 : 40, 
    left: 16, 
    right: 16, 
    zIndex: 1 
  },
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderRadius: 30, 
    paddingHorizontal: 16,
    paddingVertical: 14, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 12, 
    elevation: 5 
  },
  searchIcon: { 
    marginRight: 12, 
    fontSize: 18 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 15, 
    color: '#000000',
    fontWeight: '500'
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12
  },
  filterIcon: { 
    fontSize: 18 
  },
  locationButton: { 
    position: 'absolute', 
    right: 16, 
    backgroundColor: '#fff', 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 12, 
    elevation: 5,
    zIndex: 1
  },
  locationIcon: { 
    fontSize: 20 
  },
  marker: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#fff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 4 
  },
  markerSelected: {
    transform: [{ scale: 1.2 }],
    zIndex: 2
  },
  markerStandard: { 
    backgroundColor: '#0B3D91' 
  },
  markerPremium: { 
    backgroundColor: '#000000' 
  },
  markerText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});
