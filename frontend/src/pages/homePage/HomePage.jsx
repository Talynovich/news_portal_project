import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
console.log(isAuthenticated, 111)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])
  return (
    <div>
      adsda
    </div>
  );
};

export default HomePage;