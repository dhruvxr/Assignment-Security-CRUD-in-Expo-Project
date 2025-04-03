import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import supabase from '../lib/supabase'; // Import Supabase client for authentication

// Define navigation prop type using React Navigation's stack type
type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

// Define props interface for the SignIn component
interface SignInProps {
  navigation: SignInScreenNavigationProp; // Navigation prop passed from the navigator
}

// Functional component for the SignIn screen
const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  // Define state variables for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle user sign-in using Supabase authentication
  const handleSignIn = async () => {
    // Attempt to sign in with the provided email and password
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    // If there's an error, show an alert message
    if (error) Alert.alert('Sign In Failed', error.message);
    // If successful, navigate to the Landing screen and replace the current screen
    else navigation.replace('Landing');
  };

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      {/* Email input field */}
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      {/* Password input field */}
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry // Hides password input
        style={styles.input} 
      />
      {/* Button to trigger sign-in */}
      <Button title="Sign In" onPress={handleSignIn} />
      {/* Button to navigate to the SignUp screen */}
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

// Define basic styling for the component
const styles = StyleSheet.create({
  container: { padding: 20 }, // Adds padding around the main container
  input: { borderWidth: 1, padding: 10, marginVertical: 10, width: '100%' }, // Style for input fields
});

export default SignIn; // Export the component as default
