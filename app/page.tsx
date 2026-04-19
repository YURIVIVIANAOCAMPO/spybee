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
    setProjects(mockData as Project[]);
  }, [setProjects]);


  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Controls />
          
          <div className={styles.layoutSwitcher}>
            <div className={selectedProjectId ? styles.withMap : styles.fullWidth}>
               {selectedProjectId && <MapComponent />}
               <ProjectTable />
            </div>
          </div>
        </div>

        {selectedProjectId && (
          <aside className={styles.sidebar}>
            <Summary />
          </aside>
        )}
      </div>
    </main>
  );
}
