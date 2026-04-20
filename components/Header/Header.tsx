"use client";

import React from 'react';
import styles from './Header.module.css';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.logo_section}>
          <img src="/spybee_logo.png" alt="Spybee Logo" className={styles.logo} />
        </div>
        
        <div className={styles.user_section}>
          <div className={styles.user_info}>
            <span className={styles.user_name}>Marco</span>
            <span className={styles.user_role}>Administrador</span>
          </div>
          <div className={styles.avatar_container}>
             <div className={styles.user_avatar}>
               <span className={styles.avatar_text}>M</span>
             </div>
          </div>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
};

export default Header;
