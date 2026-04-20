"use client";

import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Controls from '../components/Controls/Controls';
import ProjectTable from '../components/ProjectTable/ProjectTable';
import Map from '../components/Map/Map';
import Summary from '../components/Summary/Summary';
import Login from '../components/Login/Login';
import { useStore } from '../store/useStore';
import mockData from '../mock_data.json';
import styles from './page.module.css';

export default function Home() {
  const { setProjects, selectedProjectId, isAuthenticated } = useStore();

  useEffect(() => {
    setProjects(mockData as any);
  }, [setProjects]);

  // Si no está autenticado, mostrar pantalla de Login
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className={styles.app_container}>
      <Header />
      
      <main className={styles.main_layout}>
        <section className={styles.content_section}>
          <Controls />
          
          <div className={styles.workspace_wrapper}>
             <div className={`${styles.table_area} ${selectedProjectId ? styles.table_area_split : ''}`}>
               <ProjectTable />
             </div>

             {selectedProjectId && (
               <div className={styles.details_area}>
                 <div className={styles.map_container}>
                    <Map />
                 </div>
                 <div className={styles.summary_container}>
                    <Summary />
                 </div>
               </div>
             )}
          </div>
        </section>
      </main>
    </div>
  );
}
