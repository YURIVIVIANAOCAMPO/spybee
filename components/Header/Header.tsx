"use client";

import React, { useState } from 'react';
import styles from './Header.module.css';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useStore();

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.logo_section}>
          <img src="/spybee_logo.png" alt="Spybee Logo" className={styles.logo} />
        </div>
        
        <div className={styles.user_container}>
          <div 
            className={styles.user_section} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={styles.user_info}>
              <span className={styles.user_name}>Marco</span>
              <span className={styles.user_role}>Administrador</span>
            </div>
            <div className={styles.avatar_container}>
              <div className={styles.user_avatar}>
                <span className={styles.avatar_text}>M</span>
              </div>
            </div>
            <ChevronDown 
              size={16} 
              className={`${styles.chevron} ${isMenuOpen ? styles.chevron_open : ''}`} 
            />
          </div>

          {isMenuOpen && (
            <div className={styles.user_dropdown}>
              <div className={styles.dropdown_item}>
                <User size={16} />
                <span>Mi Perfil</span>
              </div>
              <div className={styles.dropdown_divider} />
              <div 
                className={`${styles.dropdown_item} ${styles.logout_item}`}
                onClick={() => logout()}
              >
                <LogOut size={16} />
                <span>Cerrar sesión</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
