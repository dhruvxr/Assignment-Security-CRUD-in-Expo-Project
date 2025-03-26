import supabase  from './supabase';

// Fetch user data
export const getUserData = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Update user data
export const updateUserData = async (userId: string, newData: any) => {
  const { data, error } = await supabase
    .from('users')
    .update(newData)
    .eq('id', userId);

  if (error) throw error;
  return data;
};
