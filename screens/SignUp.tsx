import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import supabase from '../lib/supabase';

// Define navigation prop type
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { firstName, lastName } },
    });

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else {
      // Insert user details into `user_details` table
      const { error: dbError } = await supabase.from('user_details').insert([
        { uuid: data.user?.id, first_name: firstName, last_name: lastName, email },
      ]);

      if (dbError) {
        Alert.alert('Database Error', dbError.message);
      } else {
        Alert.alert('Success', 'Account created successfully!');
        navigation.replace('Landing');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Already have an account? Sign In" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, width: '100%' },
});

export default SignUp;
