import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Users } from '../../types';
import { toast } from 'react-toastify';
import i18n from 'i18next';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = createAsyncThunk<Users[], void>(
  'user/getUsers',
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  }
);

export const createUser = createAsyncThunk<Users, Users, { rejectValue: string }>(
  'user/createUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}`, user);
      toast.success(i18n.t('user.createdSuccess'));
      return response.data;
    } catch (error) {
      console.log(error, 'user/createdUser error')
      const errorMessage = i18n.t('user.createdError');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);


export const updateUser = createAsyncThunk<
  Users,
  Users,
  { rejectValue: string }
>(
  'user/updateUser',
  async ({ id, ...updatedFields }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}${id}`,
        updatedFields
      );
      toast.success(i18n.t('user.updatedSuccess'));
      return response.data;
    } catch (error) {
      console.log(error, 'user/updateUser error')
      const errorMessage = i18n.t('user.updatedError');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);