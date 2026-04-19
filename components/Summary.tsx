import React from 'react';
import styles from './Summary.module.css';
import { useStore } from '../store/useStore';
import { ChevronRight, Filter } from 'lucide-react';

const Summary = () => {
  const { projects, selectedProjectId } = useStore();
  const selectedProject = projects.find(p => p._id === selectedProjectId);

  if (!selectedProject) return (
    <div className={styles.container}>
      <h2>Selecciona un proyecto</h2>
      <p>Haz clic en un proyecto de la lista para ver el resumen.</p>
    </div>
  );

  const incidents = selectedProject.incidents.filter(i => i.item === 'incidents');
  const rfi = selectedProject.incidents.filter(i => i.item === 'RFI');
  const tasks = selectedProject.incidents.filter(i => i.item === 'task');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Filter size={18} />
          <h3>Resumen</h3>
        </div>
        <ChevronRight size={18} />
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>General</button>
        <button className={styles.tab}>Mis actualizaciones</button>
        <button className={styles.filterBtn}><Filter size={14} /> Filtros</button>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>Próximos a vencer</h4>
          <button className={styles.viewAll}>Ver todos</button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Incidencias</span>
            <span className={styles.statValue}>{incidents.length}</span>
            <span className={styles.statSub}>Total Abiertas</span>
            <div className={styles.circleProgress}>
               <div className={styles.circleText}>10</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>RFI</span>
            <span className={styles.statValue}>{rfi.length}</span>
            <span className={styles.statSub}>Total Abiertas</span>
            <div className={styles.circleProgress}>
               <div className={styles.circleText}>23</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Tareas</span>
            <span className={styles.statValue}>{tasks.length}</span>
            <span className={styles.statSub}>Total Abiertas</span>
            <div className={styles.circleProgress}>
               <div className={styles.circleText}>50</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <div className={styles.tableMini}>
          <div className={styles.miniHeader}>
            <span>Proyecto</span>
            <span>Item</span>
            <span>Fecha Límite</span>
          </div>
          {selectedProject.incidents.slice(0, 3).map((item, idx) => (
            <div key={idx} className={styles.miniRow}>
              <div className={styles.miniProject}>
                <span className={styles.miniTitle}>{selectedProject.title}</span>
                <span className={styles.miniDesc}>{item.description.substring(0, 20)}...</span>
              </div>
              <span className={styles.miniType}>{item.item}</span>
              <span className={styles.miniDate}>{new Date(item.limitDate).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
