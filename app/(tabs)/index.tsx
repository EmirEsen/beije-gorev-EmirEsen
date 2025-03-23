import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable } from 'react-native';
import { useAppSelector } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import BellIcon from '@/components/beije/ui-from-figma/BellIcon';
import TodaysHighlightsBottomSheet from '@/components/beije/TodaysHighlightsBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MentrationCycle from '@/components/beije/cycle/MenstrationCycle';
import ChevronDown from '@/components/beije/cycle/ChecronDown';

export default function CycleScreen() {
  const profile = useAppSelector(state => state.profile)
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

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

          <View style={[
            styles.cycleContainer,
            isBottomSheetExpanded && styles.cycleContainerExpanded
          ]}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: isBottomSheetExpanded ? -10 : -30,
              textAlign: 'center'
            }}>
              {new Date().getDate()} {new Date().toLocaleString('tr-TR', { month: 'long' })}
            </Text>

            {isBottomSheetExpanded ? (
              <>
                <View style={{ marginTop: 10 }}>
                  <ChevronDown />
                </View>
                <MentrationCycle
                  menstrationData={profile.menstrationDays?.data}
                  style={styles.cycleVisualizationSmall}
                />
              </>
            ) : (
              <MentrationCycle
                menstrationData={profile.menstrationDays?.data}
                style={styles.cycleVisualization}
              />
            )}
          </View>

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
    marginBottom: 40,
  },
  cycleContainerExpanded: {
    marginBottom: 0,
    justifyContent: 'flex-start',
    paddingTop: 10,
    marginTop: -20,
  },
  cycleVisualization: {
    alignSelf: 'center',
  },
  cycleVisualizationSmall: {
    alignSelf: 'center',
    transform: [{ scale: 0.7 }],
    marginTop: -70,
  },
  cycleVisualizationDetailed: {
    alignSelf: 'center',
    transform: [{ scale: 0.8 }],
    marginTop: -15,
  },
  expandedCycleView: {
    alignItems: 'center',
    marginBottom: 0,
  },
  secondaryCycleView: {
    alignItems: 'center',
    marginTop: -15,
  },
  secondaryCycleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  }
});
