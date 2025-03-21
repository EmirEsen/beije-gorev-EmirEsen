import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, FlatList } from 'react-native';
import { useAppSelector } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import BellIcon from '@/components/beije/ui-from-figma/BellIcon';
import CycleTracker from '@/components/beije/CycleTracker';
import TodaysHighlightsBottomSheet from '@/components/beije/TodaysHighlightsBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CycleScreen() {
  const profile = useAppSelector(state => state.profile)
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  // Handle bottom sheet expansion state
  const handleSheetExpand = (isExpanded: boolean) => {
    setIsBottomSheetExpanded(isExpanded);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FDECE7', '#FDECE7']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          {/* Profile icon and notification icon could go here */}
          <View style={styles.header}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileText}>
                {profile?.profile?.profileInfo.firstName[0].toUpperCase()}
              </Text>
            </View>
            <View >
              <Pressable
                style={styles.notificationIcon}
                onPress={() => console.log("Directing to Notifications. [Not requested]")}>
                <BellIcon />
              </Pressable>
            </View>
          </View>

          {profile.menstrationDays && (
            <CycleTracker
              cycleData={profile.menstrationDays}
              isExpanded={isBottomSheetExpanded}
            />
          )}

          <TodaysHighlightsBottomSheet
            insights={profile.insights ?? undefined}
            onSheetExpand={handleSheetExpand}
          />
        </SafeAreaView>
      </LinearGradient>
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F06A47',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cycleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  }
});
