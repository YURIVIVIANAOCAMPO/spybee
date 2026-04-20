"use client";

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Controls from '../components/Controls';
import ProjectTable from '../components/ProjectTable';
import MapComponent from '../components/Map';
import Summary from '../components/Summary';
import { useStore } from '../store/useStore';
import styles from './page.module.css';

import mockData from '../mock_data.json';
import { Project } from '../types/project';

export default function Home() {
  const { setProjects, selectedProjectId } = useStore();

  useEffect(() => {
    // Carga inicial de datos desde el JSON proporcionado
    setProjects(mockData as Project[]);
  }, [setProjects]);

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.wrapper}>
        <div className={styles.container}>
          
          {/* Fila 1: Título y Controles (Siempre visibles) */}
          <Controls />
          
          {/* Fila 2: Dashboard (Solo visible en Pantalla 2 tras selección) */}
          {selectedProjectId ? (
            <div className={styles.dashboard_split}>
                <div className={styles.map_container_box}>
                  <MapComponent />
                </div>
                <div className={styles.summary_sticky_box}>
                  <Summary />
                </div>
            </div>
          ) : null}

          {/* Fila 3: Listado de Proyectos (Siempre visible con scroll independiente) */}
          <div className={styles.table_section}>
            <ProjectTable />
          </div>

        </div>
      </div>
    </main>
  );
}
