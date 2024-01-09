import React from 'react'
import { redirect,} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user')

    return {data}
    
  } catch (error) {
    toast.error('Nah uh..')
    return redirect('/')
  }
}

const Admin = () => {
  return (
    <div>Admin</div>
  )
}

export default Admin