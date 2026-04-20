"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStore } from '../store/useStore';
import styles from './Map.module.css';

// Usar el token desde las variables de entorno para mayor seguridad
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
mapboxgl.accessToken = MAPBOX_TOKEN;

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { projects, mapCenter, mapZoom, selectedProjectId, setSelectedProject } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializamos el mapa con el estilo satelital solicitado
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: mapCenter,
      zoom: mapZoom,
      attributionControl: false
    });

    map.current.on('load', () => {
      setIsLoaded(true);
      map.current?.resize();
    });

    // Cleanup para evitar fugas de memoria y errores de duplicación
    return () => {
      map.current?.remove();
    };
  }, [selectedProjectId]); // Recargar mapa al cambiar de proyecto para asegurar pintado

  // Efecto de navegación suave (FlyTo)
  useEffect(() => {
    if (isLoaded && map.current) {
      map.current.flyTo({
        center: mapCenter,
        zoom: 15,
        essential: true,
        speed: 1.5
      });
    }
  }, [mapCenter, isLoaded]);

  // Marcadores de alta fidelidad
  useEffect(() => {
    if (!isLoaded || !map.current) return;

    // Eliminar marcadores existentes
    const elements = document.getElementsByClassName(styles.marker_container);
    while (elements.length > 0) elements[0].remove();

    projects.forEach(project => {
      if (!project.position) return;

      const el = document.createElement('div');
      el.className = styles.marker_container;
      
      const label = document.createElement('div');
      label.className = styles.marker_label;
      label.innerText = project.title;

      const dot = document.createElement('div');
      dot.className = styles.marker_dot;
      if (selectedProjectId === project._id) {
          dot.classList.add(styles.marker_dot_selected);
      }

      el.appendChild(label);
      el.appendChild(dot);

      new mapboxgl.Marker(el)
        .setLngLat([project.position.lng, project.position.lat])
        .addTo(map.current!);

      el.addEventListener('click', () => setSelectedProject(project._id));
    });
  }, [isLoaded, projects, selectedProjectId]);

  return (
    <div className={styles.map_wrapper}>
       <div ref={mapContainer} className={styles.map_view} />
    </div>
  );
};

export default MapComponent;
