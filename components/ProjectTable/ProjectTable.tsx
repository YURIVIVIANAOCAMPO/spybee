import React from 'react';
import styles from './ProjectTable.module.css';
import { useStore } from '../../store/useStore';
import { Clock, ExternalLink, CloudRain } from 'lucide-react';

const ProjectTable = () => {
  const { filteredProjects, currentPage, itemsPerPage, setSelectedProject, selectedProjectId, setCurrentPage } = useStore();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const isRaining = (lat: number) => Math.floor(lat) % 2 === 0;

  const getPlanDisplay = (planKey?: string) => {
    const p = (planKey || '').toLowerCase();
    if (p === 'small') return { label: 'Pequeño', color: '#d35400' };
    if (p === 'big') return { label: 'Avanzado', color: '#546e7a' };
    return { label: 'Premium', color: '#f9a825' };
  };

  return (
    <div className={styles.table_container}>
      <table className={styles.table_main}>
        <thead>
          <tr>
            <th className={styles.table_header_cell}>Proyecto</th>
            <th className={styles.table_header_cell}>Plan</th>
            <th className={styles.table_header_cell}>Estado</th>
            <th className={styles.table_header_cell}>Equipo</th>
            <th className={styles.table_header_cell}>Items por vencer</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((project) => {
            const hasRain = project.position ? isRaining(project.position.lat) : false;
            const plan = getPlanDisplay(project.projectPlanData?.plan);
            
            const incidentsCount = project.incidents?.filter(i => (i.item as string) === 'incidents').length || 0;
            const rfiCount = project.incidents?.filter(i => (i.item as string) === 'RFI').length || 0;
            const taskCount = project.incidents?.filter(i => (i.item as string) === 'task' || (i.item as string) === 'tareas').length || 0;

            return (
              <tr 
                key={project._id} 
                className={`${styles.table_row} ${selectedProjectId === project._id ? styles['table_row--selected'] : ''}`}
                onClick={() => setSelectedProject(project._id)}
              >
                <td className={styles.table_cell}>
                  <div className={styles.project_identity}>
                    <img src="/spybee_logo.png" alt="" className={styles.project_avatar} style={{ padding: '6px' }} />
                    <div className={styles.project_details}>
                      <span className={styles.project_name}>
                        {project.title} 
                        {hasRain && <CloudRain size={14} className={styles.rain_icon} />}
                        <ExternalLink size={14} className={styles.project_icon} />
                      </span>
                      <div className={styles.project_dates}>
                        <Clock size={12} /> 24 Nov 2023 <Clock size={12} /> 24 Nov 2023
                      </div>
                    </div>
                  </div>
                </td>
                <td className={styles.table_cell}>
                  <span className={styles.badge_plan} style={{ backgroundColor: plan.color }}>
                    {plan.label}
                  </span>
                </td>
                <td className={styles.table_cell}>
                  <span className={styles.badge_status}>
                    Activo
                  </span>
                </td>
                <td className={styles.table_cell}>
                  <div className={styles.team_list}>
                    {project.users.slice(0, 5).map((user, i) => (
                      <div key={i} className={styles.team_hexagon}>
                        {user.name.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                    ))}
                    {project.users.length > 5 && (
                      <div className={styles.team_hexagon_more}>+{project.users.length - 5}</div>
                    )}
                  </div>
                </td>
                <td className={styles.table_cell}>
                  <div className={styles.metrics_group}>
                    <div className={styles.metric_item}>
                      <span className={styles.metric_value}>{incidentsCount}</span>
                      <span className={styles.metric_label}>Incidencias</span>
                    </div>
                    <div className={styles.metric_item}>
                      <span className={styles.metric_value}>{rfiCount}</span>
                      <span className={styles.metric_label}>RFI</span>
                    </div>
                    <div className={styles.metric_item}>
                      <span className={styles.metric_value}>{taskCount}</span>
                      <span className={styles.metric_label}>Tareas</span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <footer className={styles.pagination_container}>
        <button 
          className={styles.pagination_button} 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt;
        </button>
        <span className={styles.pagination_info}>Página {currentPage} de {totalPages}</span>
        <button 
          className={styles.pagination_button} 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &gt;
        </button>
      </footer>
    </div>
  );
};

export default ProjectTable;
