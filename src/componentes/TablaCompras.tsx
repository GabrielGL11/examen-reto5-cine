import React from 'react';
import type { Compra, Funcion, Cliente } from '../dominio/modelos';
import { FilaCompra } from './FilaCompra';

interface TablaComprasProps {
  compras: Compra[];
  funciones: Funcion[];
  clientes: Cliente[];
  onCancelar: (id: number) => void;
}

export const TablaCompras: React.FC<TablaComprasProps> = ({
  compras,
  funciones,
  clientes,
  onCancelar
}) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Función</th>
            <th>Cant.</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <FilaCompra
              key={compra.id}
              compra={compra}
              funciones={funciones}
              clientes={clientes}
              onCancelar={onCancelar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};