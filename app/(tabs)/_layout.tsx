import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/feature/AuthSlice';
import { AppDispatch } from '@/store';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { getInsights, getMenstrationDays, getProfile } from '@/store/feature/ProfileSlice';
import Dot from '@/components/beije/bottomtab/dot';
import Calender from '@/components/beije/bottomtab/calender';
import Analysis from '@/components/beije/bottomtab/analysis';
import Guide from '@/components/beije/bottomtab/guide';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const dispatch = useDispatch<AppDispatch>();

  //Mocking login with provided data
  useEffect(() => {
    dispatch(fetchLogin({
      "email": "salar@beije.co",
      "password": "beijeApp"
    }))
      .then(() => {
        dispatch(getProfile())
        dispatch(getMenstrationDays())
        dispatch(getInsights())
      });
  }, [dispatch])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F69C85",
        tabBarInactiveTintColor: "#B1B1B1",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: '#F7F7F7',
          borderTopWidth: 0
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Döngü',
          headerShown: false,
          tabBarIcon: ({ color }) => <Dot color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? '#343131' : '#B1B1B1' }}>Döngü</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          title: 'Takvim',
          tabBarIcon: ({ color }) => <Calender color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? '#343131' : '#B1B1B1' }}>Takvim</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analiz',
          tabBarIcon: ({ color }) => <Analysis color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? '#343131' : '#B1B1B1' }}>Analiz</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Rehber',
          tabBarIcon: ({ color }) => <Guide color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? '#343131' : '#B1B1B1' }}>Rehber</Text>
          ),
        }}
      />
    </Tabs>
  );
}
