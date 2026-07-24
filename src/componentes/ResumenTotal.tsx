import React from 'react';

interface ResumenTotalProps {
  total: number;
}

export const ResumenTotal: React.FC<ResumenTotalProps> = ({ total }) => {
  return (
    <div className="cine-resumen-box">
      <div className="cine-resumen-total">
        Total: ${total.toFixed(2)}
      </div>
      <div className="cine-resumen-descuento">
        Desde 5 unidades: 10% de descuento
      </div>
    </div>
  );
};