import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import supabase from '../lib/supabase';

// Define navigation prop type
type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface LandingProps {
  navigation: LandingScreenNavigationProp;
}

const Landing: React.FC<LandingProps> = ({ navigation }) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: user } = await supabase.auth.getUser();

      if (user) {
        // Fetch user details from database
        const { data, error } = await supabase
          .from('user_details')
          .select('first_name, last_name')
          .eq('uuid', user.user?.id)
          .single();

        if (!error && data) {
          setUserName(`${data.first_name} ${data.last_name}`);
        }
      } else {
        navigation.replace('SignIn');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {userName || 'User'}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
});

export default Landing;
