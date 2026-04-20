"use client";

import React, { useState } from 'react';
import styles from './Controls.module.css';
import { Search, Filter, List, LayoutGrid, Map as MapIcon, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Controls = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { searchQuery, setSearchQuery, sortBy, setSortBy, filteredProjects } = useStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (type: 'alphabetical' | 'incidents' | 'rfi' | 'tasks') => {
    setSortBy(type);
    setIsFilterOpen(false);
  };

  return (
    <nav className={styles.controls_container}>
      <div className={styles.title_section}>
        <h1 className={styles.main_title}>Mis proyectos</h1>
        <span className={styles.count_pill}>{filteredProjects.length} Proyectos</span>
      </div>

      <div className={styles.actions_section}>
        <div className={styles.filter_wrapper}>
          <button 
            className={styles.icon_button} 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} />
          </button>
          
          {isFilterOpen && (
            <div className={styles.filter_menu}>
              <div className={styles.menu_item} onClick={() => handleSortChange('alphabetical')}>Orden alfabetico</div>
              <div className={styles.menu_item} onClick={() => handleSortChange('incidents')}>Numero de Incidencias</div>
              <div className={styles.menu_item} onClick={() => handleSortChange('rfi')}>Numero de RFI</div>
              <div className={styles.menu_item} onClick={() => handleSortChange('tasks')}>Numero de Tareas</div>
            </div>
          )}
        </div>

        <div className={styles.view_group}>
          <div className={styles.view_item}><List size={18} /></div>
          <div className={styles.view_item}><LayoutGrid size={18} /></div>
          <div className={styles.view_item}><LayoutGrid size={18} /></div>
          <div className={`${styles.view_item} ${styles.view_item_active}`}><MapIcon size={18} /></div>
        </div>

        <div className={styles.search_container}>
          <input 
            type="text" 
            placeholder="Buscar" 
            className={styles.search_input}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className={styles.search_icon} size={18} />
        </div>

        <button className={styles.add_button}>
          <Plus size={18} />
          Crear proyecto
        </button>
      </div>
    </nav>
  );
};

export default Controls;
