"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStore } from '../store/useStore';
import styles from './Map.module.css';

// TODO: Replace with your actual Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoibW9kZXJuZGFzaGJvYXJkIiwiYSI6ImNsd3h6Z3Z6dzAwZ3Mya28xanVnM3BtcmYifQ.xxxxx';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { projects, mapCenter, mapZoom, setSelectedProject, selectedProjectId } = useStore();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: mapCenter,
      zoom: mapZoom
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, []);

  useEffect(() => {
    if (!map.current) return;
    
    // Smooth navigation
    map.current.flyTo({
      center: mapCenter,
      zoom: mapZoom,
      essential: true
    });
  }, [mapCenter, mapZoom]);

  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    projects.forEach(project => {
      const el = document.createElement('div');
      el.className = styles.marker;
      if (selectedProjectId === project._id) {
        el.classList.add(styles.selectedMarker);
      }

      const marker = new mapboxgl.Marker(el)
        .setLngLat([project.position.lng, project.position.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${project.title}</h3>`))
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedProject(project._id);
      });

      markers.current.push(marker);
    });
  }, [projects, selectedProjectId]);

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
};

export default MapComponent;
