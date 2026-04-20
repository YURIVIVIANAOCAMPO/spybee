"use client";

import React from 'react';
import styles from './Header.module.css';
import { ChevronDown, User } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header = () => {
  const { user } = useStore();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          {/* El logo ya contiene el nombre por lo que eliminamos el span de texto para evitar duplicidad */}
          <img src="/spybee_logo.png" alt="Spybee Logo" className={styles.logo} />
        </div>

        <div className={styles.right}>
          {user ? (
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <User size={20} color="#333" />
                <div className={styles.avatar_indicator} />
              </div>
              <div className={styles.user_info}>
                <span className={styles.user_name}>Marco</span>
                <span className={styles.user_role}>Administrador</span>
              </div>
              <ChevronDown size={14} className={styles.chevron} />
            </div>
          ) : (
            <button className={styles.login_btn}>Iniciar sesión</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
