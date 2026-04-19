import React from 'react';
import styles from './ProjectTable.module.css';
import { useStore } from '../store/useStore';
import { Clock, ExternalLink } from 'lucide-react';

const ProjectTable = () => {
  const { filteredProjects, currentPage, itemsPerPage, setSelectedProject, selectedProjectId } = useStore();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#e8f5e9';
      case 'suspended': return '#fff3e0';
      default: return '#f5f5f5';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'active': return '#2e7d32';
      case 'suspended': return '#ef6c00';
      default: return '#666';
    }
  };

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'big': return 'Grande';
      case 'small': return 'Pequeño';
      case 'premium': return 'Premium';
      case 'advanced': return 'Avanzado';
      default: return plan;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'big': return '#8d6e63';
      case 'small': return '#bf360c';
      case 'premium': return '#ff8f00';
      case 'advanced': return '#607d8b';
      default: return '#ccc';
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Plan</th>
            <th>Estado</th>
            <th>Equipo</th>
            <th>Items por vencer</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((project) => {
            const counts = {
              incidents: project.incidents.filter(i => i.item === 'incidents').length,
              rfi: project.incidents.filter(i => i.item === 'RFI').length,
              tasks: project.incidents.filter(i => i.item === 'task').length
            };

            return (
              <tr 
                key={project._id} 
                className={`${styles.row} ${selectedProjectId === project._id ? styles.selected : ''}`}
                onClick={() => setSelectedProject(project._id)}
              >
                <td>
                  <div className={styles.projectCell}>
                    <div className={styles.avatarPlaceholder} />
                    <div className={styles.projectInfo}>
                      <span className={styles.projectName}>{project.title} <ExternalLink size={14} className={styles.icon} /></span>
                      <div className={styles.dates}>
                        <Clock size={12} /> 24 Nov 2023 <Clock size={12} /> 24 Nov 2023
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span 
                    className={styles.planBadge}
                    style={{ backgroundColor: getPlanColor(project.projectPlanData.plan) }}
                  >
                    {getPlanLabel(project.projectPlanData.plan)}
                  </span>
                </td>
                <td>
                  <span 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(project.status), color: getStatusTextColor(project.status) }}
                  >
                    {project.status === 'active' ? 'Activo' : 'Suspendido'}
                  </span>
                </td>
                <td>
                  <div className={styles.team}>
                    {project.users.slice(0, 5).map((user, i) => (
                      <div key={i} className={styles.teamMember} title={`${user.name} ${user.lastName}`}>
                        {user.name.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                    ))}
                    {project.users.length > 5 && (
                      <div className={`${styles.teamMember} ${styles.more}`}>
                        +{project.users.length - 5}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.itemsVencer}>
                    <div className={styles.itemCount}>
                      <span className={styles.countNum}>{counts.incidents}</span>
                      <span className={styles.countLabel}>Incidencias</span>
                    </div>
                    <div className={styles.itemCount}>
                      <span className={styles.countNum}>{counts.rfi}</span>
                      <span className={styles.countLabel}>RFI</span>
                    </div>
                    <div className={styles.itemCount}>
                      <span className={styles.countNum}>{counts.tasks}</span>
                      <span className={styles.countLabel}>Tareas</span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button 
          className={styles.pageBtn} 
          disabled={currentPage === 1}
          onClick={() => useStore.getState().setCurrentPage(currentPage - 1)}
        >
          &lt;
        </button>
        <span className={styles.pageInfo}>Página {currentPage} de {totalPages}</span>
        <button 
          className={styles.pageBtn} 
          disabled={currentPage === totalPages}
          onClick={() => useStore.getState().setCurrentPage(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProjectTable;
