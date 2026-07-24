import React from 'react';
import type { Compra, Funcion, Cliente } from '../dominio/modelos';

interface FilaCompraProps {
  compra: Compra;
  funciones: Funcion[];
  clientes: Cliente[];
  onCancelar: (id: number) => void;
}

export const FilaCompra: React.FC<FilaCompraProps> = ({
  compra,
  funciones,
  clientes,
  onCancelar
}) => {
  const esPendiente = compra.estado === 'PENDIENTE';
  const aplicaDescuento = compra.cantidad >= 5;

  const obtenerNombreCliente = (clienteId: number) => {
    const c = clientes.find(x => x.id === clienteId);
    return c ? c.nombre : `Cliente #${clienteId}`;
  };

  const obtenerNombreFuncion = (funcionId: number) => {
    const f = funciones.find(x => x.id === funcionId);
    return f ? f.titulo : `Función #${funcionId}`;
  };

  return (
    <tr>
      <td>{obtenerNombreCliente(compra.clienteId)}</td>
      <td>{obtenerNombreFuncion(compra.funcionId)}</td>
      <td>{compra.cantidad}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>${compra.total.toFixed(2)}</span>
          {aplicaDescuento && <span className="badge-descuento">-10%</span>}
        </div>
      </td>
      <td>
        <span className={`badge-estado ${compra.estado.toLowerCase()}`}>
          {compra.estado}
        </span>
      </td>
      <td>
        {esPendiente ? (
          <button 
            onClick={() => onCancelar(compra.id)}
            className="btn-cancelar-activo"
          >
            Cancelar
          </button>
        ) : (
          <button disabled className="btn-cancelar-inactivo">
            Cancelar
          </button>
        )}
        {compra.estado === 'CANCELADA' && (
          <div className="texto-nota-repuesta">
            {compra.cantidad} entradas repuestas a la disponibilidad
          </div>
        )}
      </td>
    </tr>
  );
};