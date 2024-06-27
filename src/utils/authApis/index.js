import { supabase } from "../supabase";

export const LoginFn = async function (formData) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async function () {
  const { data, error } = await supabase.auth.getSession();
  if (!data) return null;
  if (error) throw new Error(error.message);
  return data.session?.user;
};

export const SignUp = async function (formData) {
  try {
    let { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        username: formData.name,
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async function () {
  try {
    let { data, error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
