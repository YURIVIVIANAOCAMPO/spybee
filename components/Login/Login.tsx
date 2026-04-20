"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';
import { useStore } from '../../store/useStore';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de contraseña personalizada
    if (password === 'spybee2026') {
      setError('');
      login();
    } else {
      setError('Contraseña incorrecta. Intente nuevamente.');
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login_overlay}>
      <div className={styles.login_card}>
        <div className={styles.logo_container}>
          <img src="/spybee_logo.png" alt="Spybee Logo" className={styles.logo} />
        </div>
        
        <h2 className={styles.login_title}>Bienvenido a Spybee</h2>
        <p className={styles.login_subtitle}>Gestiona tus proyectos con inteligencia urbana</p>
        
        <form onSubmit={handleSubmit} className={styles.login_form}>
          <div className={styles.input_group}>
            <Mail className={styles.input_icon} size={20} />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className={styles.input_field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.input_group}>
            <Lock className={styles.input_icon} size={20} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              className={styles.input_field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className={styles.eye_button} 
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className={styles.error_message}>{error}</p>}
          
          <button type="submit" className={styles.login_button}>
            <LogIn size={20} />
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
