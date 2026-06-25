'use client'

import { useEffect, useState } from 'react'
import { Memory } from '../models/Memory'
import { TechStackWanderer } from '../models/TechStackWanderer'
import { Wanderer } from '../models/Wanderer'
import WindowModel from '../models/WindowModel'

const MODELS = [WindowModel, Memory, Wanderer, TechStackWanderer];

const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <group visible={false} position={[0, -999, 0]}>
      {MODELS.map((Component, index) => (
        <Component key={index} />
      ))}
    </group>
  );
}

export default Preloader;
