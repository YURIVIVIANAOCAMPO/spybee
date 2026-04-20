"use client";

import React, { useState } from 'react';
import styles from './Controls.module.css';
import { Search, Plus, Filter, List, Grid, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';

const Controls = () => {
  const { searchQuery, setSearchQuery, sortBy, setSortBy, projects } = useStore();
  const [showSort, setShowSort] = useState(false);

  const sortOptions: { label: string; value: 'alphabetical' | 'incidents' | 'rfi' | 'tasks' }[] = [
    { label: 'Orden alfabetico', value: 'alphabetical' },
    { label: 'Numero de Incidencias', value: 'incidents' },
    { label: 'Numero de RFI', value: 'rfi' },
    { label: 'Numero de Tareas', value: 'tasks' },
  ];

  return (
    <div className={styles.controls_container}>
      <div className={styles.controls_left}>
        <h1 className={styles.controls_title}>Mis proyectos</h1>
        <span className={styles.controls_badge}>{projects.length} Proyectos</span>
      </div>

      <div className={styles.controls_right}>
        {/* Filtro/Sort individual centrado */}
        <div style={{ position: 'relative' }}>
          <button className={styles.sort_trigger_btn} onClick={() => setShowSort(!showSort)}>
             <Filter size={14} />
          </button>
          
          {showSort && (
            <div className={styles.dropdown_centered}>
              {sortOptions.map(opt => (
                <div 
                  key={opt.value} 
                  className={styles.dropdown_item} 
                  onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Switcher con colores exactos */}
        <div className={styles.view_selector_group}>
          <button className={styles.view_icon_btn}><List size={16} /></button>
          <div className={styles.v_divider} />
          <button className={styles.view_icon_btn}><Grid size={16} /></button>
          <div className={styles.v_divider} />
          <button className={styles.view_icon_map_active}><MapPin size={16} /></button>
        </div>

        {/* Buscador Mockup Style */}
        <div className={styles.search_container_gold}>
          <input 
            type="text" 
            placeholder="Buscar" 
            className={styles.search_input_field}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className={styles.search_icon_box} />
        </div>

        {/* Crear Proyecto */}
        <button className={styles.create_project_btn}>
          <Plus size={18} /> Crear proyecto
        </button>
      </div>
    </div>
  );
};

export default Controls;
