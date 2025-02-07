import React from 'react'
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { useAuthStore } from '../../store/authStore.js';


function HomePage() {
  const {user} = useAuthStore();

  return (
    //<div className='hero-bg h-screen'>HomePage</div>
    <div>
      {user? <HomeScreen/>:<AuthScreen/>}
    </div>
  
  )
}

export default HomePage