import React from 'react';
import styles from './Header.module.css';
import { ChevronDown, User } from 'lucide-react';
import { useStore } from '../store/useStore';


const Header = () => {
  const { user, logout } = useStore();

  if (!user) return (
    <header className={styles.header}>
       <div className={styles.logo}>
        <img src="/spybee_logo.png" alt="Spybee" className={styles.logoImg} />
        <span>Spybee</span>
      </div>
      <button className={styles.loginBtn}>Iniciar Sesión</button>
    </header>
  );

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/spybee_logo.png" alt="Spybee" className={styles.logoImg} />
        <span>Spybee</span>
      </div>
      <div className={styles.userProfile} onClick={() => logout()}>
        <div className={styles.avatar}>
          <User size={20} />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>{user.role}</span>
        </div>
        <ChevronDown size={16} />
      </div>
    </header>
  );
};


export default Header;
