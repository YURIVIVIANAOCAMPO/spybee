import React from 'react';
import styles from './Summary.module.css';
import { useStore } from '../store/useStore';
import { ChevronRight, Filter, Calendar, Clock } from 'lucide-react';

const Summary = () => {
  const { projects, selectedProjectId } = useStore();
  const selectedProject = projects.find(p => p._id === selectedProjectId);

  if (!selectedProject) return (
    <div className={styles.summary_empty}>
      <h3>Proyecto no seleccionado</h3>
      <p>Selecciona un proyecto de la lista para ver el resumen detallado.</p>
    </div>
  );

  const CircularProgress = ({ percent, total, label, color }: { percent: number, total: number, label: string, color: string }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className={styles.stat_card}>
        <div className={styles.stat_card_top}>
            <div className={styles.stat_info}>
                <span className={styles.stat_label}>{label}</span>
                <span className={styles.stat_total}>{total}</span>
                <span className={styles.stat_sub}>Total Abiertas</span>
            </div>
        </div>
        <div className={styles.progress_circle_box}>
            <svg width="70" height="70">
                <circle cx="35" cy="35" r={radius} className={styles.circle_bg} />
                <circle 
                    cx="35" cy="35" r={radius} 
                    className={styles.circle_fg}
                    style={{ stroke: color, strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            <span className={styles.percent_text}>{percent}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.summary_container}>
      {/* Header */}
      <div className={styles.summary_header}>
        <div className={styles.summary_title_group}>
           <Filter size={16} />
           <h3 className={styles.summary_title}>Resumen</h3>
        </div>
        <ChevronRight size={18} color="#ccc" />
      </div>

      {/* Tabs */}
      <div className={styles.summary_tabs}>
        <button className={`${styles.tab} ${styles.tab_active}`}>General</button>
        <button className={styles.tab}>Mis actualizaciones</button>
        <button className={styles.filter_tab}><Filter size={14} /> Filtros</button>
      </div>

      {/* Section 1 */}
      <div className={styles.section}>
        <div className={styles.section_header}>
          <h4 className={styles.section_title}>⌛ Próximos a vencer</h4>
          <span className={styles.view_all}>Ver todos</span>
        </div>

        <div className={styles.stats_grid}>
          <CircularProgress label="Incidencias" total={60} percent={10} color="#ff5252" />
          <CircularProgress label="RFI" total={50} percent={23} color="#ff5252" />
          <CircularProgress label="Tareas" total={120} percent={50} color="#ff5252" />
        </div>
      </div>

      {/* Mini Table */}
      <div className={styles.mini_table_wrapper}>
        <div className={styles.mini_header}>
          <span>Proyecto</span>
          <span>Item</span>
          <span>Fecha Límite</span>
        </div>
        <div className={styles.mini_list}>
          {[1,2,3].map((_, i) => (
            <div key={i} className={styles.mini_row}>
              <div className={styles.p_info}>
                <span className={styles.p_name}>Proyecto uno</span>
                <span className={styles.p_desc}>Revisar reportes de mié...</span>
              </div>
              <span className={styles.p_type}>Incidencia</span>
              <div className={styles.p_date}>
                <span>12/08/2024</span>
                <span className={styles.p_time}>🕒 15:00</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.section_events}>
        <div className={styles.section_header}>
          <h4 className={styles.section_title}><Calendar size={14} /> Próximos eventos</h4>
          <span className={styles.view_all}>Ver todos</span>
        </div>
        <div className={styles.event_row}>
           <div className={styles.p_info}>
                <span className={styles.p_name}>Proyecto uno</span>
                <span className={styles.p_desc}>Revisar reportes de mié...</span>
           </div>
           <div className={styles.team_avatar_small}>JC</div>
           <div className={styles.p_date}>
                <span>12/08/2024</span>
                <span className={styles.p_time}>🕒 15:00</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
