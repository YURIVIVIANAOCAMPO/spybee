"use client";

import React, { useState } from 'react';
import styles from './Summary.module.css';
import { useStore } from '../../store/useStore';
import { Filter, ChevronRight, Clock, Activity } from 'lucide-react';

const Summary = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'updates'>('general');
  const { selectedProjectId, projects } = useStore();
  
  const project = projects.find(p => p._id === selectedProjectId);

  if (!project) return null;

  const incidents = project.incidents || [];
  const incidentsCount = incidents.filter(i => (i.item as string) === 'incidents').length;
  const rfiCount = incidents.filter(i => (i.item as string) === 'RFI').length;
  const taskCount = incidents.filter(i => (i.item as string) === 'task' || (i.item as string) === 'tareas').length;

  const totalOpen = incidents.length || 1;

  // Datos simulados para "Mis actualizaciones" basados en el JSON
  const updates = [
    { text: "Visita registrada", date: project.lastVisit, user: "Marco" },
    { text: "Nueva incidencia", date: new Date().toISOString(), user: "Admin" },
    { text: "Cambio de estado a " + project.status, date: new Date().toISOString(), user: "Sistema" }
  ];

  return (
    <section className={styles.summary_card}>
      <header className={styles.header}>
        <div className={styles.header_title}>
          <Filter size={18} />
          <span>Resumen</span>
        </div>
        <ChevronRight size={20} className={styles.chevron} />
      </header>

      <div className={styles.tabs}>
        <span 
          className={`${styles.tab} ${activeTab === 'general' ? styles.tab_active : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </span>
        <span 
          className={`${styles.tab} ${activeTab === 'updates' ? styles.tab_active : ''}`}
          onClick={() => setActiveTab('updates')}
        >
          Mis actualizaciones
        </span>
        <div className={styles.filter_pill}>
          <Filter size={14} />
          <span>Filtros</span>
        </div>
      </div>

      {activeTab === 'general' ? (
        <>
          <div className={styles.vencer_section}>
            <div className={styles.section_header}>
              <span>⏳ Próximos a vencer</span>
            </div>

            <div className={styles.stats_grid}>
              <div className={styles.stat_card}>
                <span className={styles.stat_label}>Incidencias</span>
                <span className={styles.stat_total}>{incidentsCount * 6}</span>
                <span className={styles.stat_subtitle}>Total Abiertas</span>
                <div className={styles.progress_box}>
                  <svg viewBox="0 0 36 36" className={styles.circular_chart}>
                    <path className={styles.circle_bg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={styles.circle} strokeDasharray={`${(incidentsCount / totalOpen) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className={styles.progress_value}>{incidentsCount}</span>
                </div>
              </div>

              <div className={styles.stat_card}>
                <span className={styles.stat_label}>RFI</span>
                <span className={styles.stat_total}>{rfiCount * 5}</span>
                <span className={styles.stat_subtitle}>Total Abiertas</span>
                <div className={styles.progress_box}>
                  <svg viewBox="0 0 36 36" className={styles.circular_chart}>
                    <path className={styles.circle_bg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={styles.circle} strokeDasharray={`${(rfiCount / totalOpen) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className={styles.progress_value}>{rfiCount}</span>
                </div>
              </div>

              <div className={styles.stat_card}>
                <span className={styles.stat_label}>Tareas</span>
                <span className={styles.stat_total}>{taskCount * 8}</span>
                <span className={styles.stat_subtitle}>Total Abiertas</span>
                <div className={styles.progress_box}>
                  <svg viewBox="0 0 36 36" className={styles.circular_chart}>
                    <path className={styles.circle_bg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={styles.circle} strokeDasharray={`${(taskCount / totalOpen) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className={styles.progress_value}>{taskCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.expiration_table_box}>
            <table className={styles.mini_table}>
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Item</th>
                  <th>Fecha Límite</th>
                </tr>
              </thead>
              <tbody>
                {(project.incidents || []).slice(0, 3).map((incident, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className={styles.mini_proj_name}>{project.title}</div>
                      <div className={styles.mini_desc}>{incident.description.substring(0, 25)}...</div>
                    </td>
                    <td className={styles.mini_item_type}>{incident.item}</td>
                    <td className={styles.mini_date}>
                      <div>12/08/2024</div>
                      <div className={styles.mini_time}><Clock size={10} /> 15:00</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className={styles.updates_area}>
          {updates.map((upd, i) => (
            <div key={i} className={styles.update_item}>
              <div className={styles.update_icon}>
                <Activity size={14} />
              </div>
              <div className={styles.update_content}>
                <span className={styles.update_text}>{upd.text}</span>
                <div className={styles.update_sub}>
                  <span>Por {upd.user}</span> • <span>{new Date(upd.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Summary;
