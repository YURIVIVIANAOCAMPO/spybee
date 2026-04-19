import React, { useState } from 'react';
import styles from './Controls.module.css';
import { Search, List, Grid, Map as MapIcon, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SortOption } from '../types/project';

const Controls = () => {
  const { searchQuery, setSearchQuery, sortBy, setSortBy, filteredProjects } = useStore();
  const [showSort, setShowSort] = useState(false);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Orden alfabético', value: 'alphabetical' },
    { label: 'Número de Incidencias', value: 'incidents' },
    { label: 'Número de RFI', value: 'rfi' },
    { label: 'Número de Tareas', value: 'tasks' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          Mis proyectos <span className={styles.badge}>{filteredProjects.length} Proyectos</span>
        </h1>
      </div>
      
      <div className={styles.right}>
        <div className={styles.viewToggle}>
          <button className={styles.iconBtn}><SlidersHorizontal size={18} /></button>
          <div className={styles.divider}></div>
          <button className={styles.iconBtn}><List size={18} /></button>
          <button className={styles.iconBtn}><Grid size={18} /></button>
          <button className={styles.iconBtn}><MapIcon size={18} /></button>
        </div>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <Search className={styles.searchIcon} size={18} />
        </div>

        <div className={styles.sortWrapper}>
          <button 
            className={styles.sortBtn}
            onClick={() => setShowSort(!showSort)}
          >
            <SlidersHorizontal size={16} />
            <ChevronDown size={14} />
          </button>
          {showSort && (
            <div className={styles.dropdown}>
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`${styles.dropdownItem} ${sortBy === opt.value ? styles.active : ''}`}
                  onClick={() => {
                    setSortBy(opt.value);
                    setShowSort(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className={styles.createBtn}>+ Crear proyecto</button>
      </div>
    </div>
  );
};

export default Controls;
