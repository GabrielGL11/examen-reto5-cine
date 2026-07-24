import React from 'react';

interface BadgeProps {
  estado: string;
}

export const Badge: React.FC<BadgeProps> = ({ estado }) => {
  const esActivo = estado === 'Activo';
  
  return (
    <span
      style={{
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-block',
        backgroundColor: esActivo ? '#d1fae5' : '#e5e7eb',
        color: esActivo ? '#065f46' : '#374151',
      }}
    >
      {estado}
    </span>
  );
};