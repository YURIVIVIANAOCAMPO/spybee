"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStore } from '../../store/useStore';
import styles from './Map.module.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { filteredProjects, mapCenter, selectedProjectId, setSelectedProject } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [-74.1448, 4.6938],
      zoom: 12,
      attributionControl: false
    });

    map.current.on('load', () => {
      setIsLoaded(true);
      setTimeout(() => map.current?.resize(), 100);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); 

  useEffect(() => {
    if (isLoaded && map.current) {
      map.current.flyTo({
        center: mapCenter,
        zoom: 15,
        essential: true,
        speed: 1.2
      });
    }
  }, [mapCenter, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !map.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Pintar marcadores solo para los proyectos filtrados
    filteredProjects.forEach(project => {
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

      const marker = new mapboxgl.Marker(el)
        .setLngLat([project.position.lng, project.position.lat])
        .addTo(map.current!);

      el.addEventListener('click', () => setSelectedProject(project._id));
      markersRef.current.push(marker);
    });
  }, [isLoaded, filteredProjects, selectedProjectId]);

  return (
    <div className={styles.map_wrapper}>
       <div ref={mapContainer} className={styles.map_view} />
    </div>
  );
};

export default MapComponent;
