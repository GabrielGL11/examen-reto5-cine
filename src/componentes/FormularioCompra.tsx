import React from 'react';
import type { Funcion, Cliente } from '../dominio/modelos';
import { ResumenTotal } from './ResumenTotal';

interface FormularioCompraProps {
  funciones: Funcion[];
  clientes: Cliente[];
  funcionId: number;
  clienteId: number;
  cantidad: number;
  disponibles: number;
  totalCalculado: number;
  cantidadInvalida: boolean;
  onCambiarFuncion: (id: number) => void;
  onCambiarCliente: (id: number) => void;
  onCambiarCantidad: (cant: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormularioCompra: React.FC<FormularioCompraProps> = ({
  funciones,
  clientes,
  funcionId,
  clienteId,
  cantidad,
  disponibles,
  totalCalculado,
  cantidadInvalida,
  onCambiarFuncion,
  onCambiarCliente,
  onCambiarCantidad,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="cine-formulario">
      
      {/* Selector de Función */}
      <div className="cine-campo">
        <label className="cine-label">
          Función <span className="cine-requerido">*</span>
        </label>
        <select 
          value={funcionId} 
          onChange={(e) => onCambiarFuncion(Number(e.target.value))}
          className="cine-select"
        >
          {funciones.map(f => {
            const nombreFuncion = (f as any).nombre || f.titulo || `Función #${f.id}`;
            // Aquí leemos correctamente 'precioUnitario' de tu API del JSON
            const precioSeguro = Number((f as any).precioUnitario ?? f.precio ?? 0);
            return (
              <option key={f.id} value={f.id}>
                {nombreFuncion} — ${precioSeguro.toFixed(2)}
              </option>
            );
          })}
        </select>
        <span className="cine-pista">
          Quedan {disponibles} disponibles
        </span>
      </div>

      {/* Selector de Cliente */}
      <div className="cine-campo">
        <label className="cine-label">
          Cliente <span className="cine-requerido">*</span>
        </label>
        <div className="cine-grupo-horizontal">
          <select 
            value={clienteId} 
            onChange={(e) => onCambiarCliente(Number(e.target.value))}
            className="cine-select cine-select-flex"
          >
            {clientes.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre} — {c.cedula}
              </option>
            ))}
          </select>
          <button 
            type="button"
            className="cine-btn-secundario"
          >
            + Nuevo cliente
          </button>
        </div>
      </div>

      {/* Entrada de Cantidad */}
      <div className="cine-campo">
        <label className="cine-label">
          Cantidad <span className="cine-requerido">*</span>
        </label>
        <input 
          type="number" 
          min="1" 
          max={disponibles}
          value={cantidad}
          onChange={(e) => onCambiarCantidad(Number(e.target.value))}
          className="cine-input"
        />
        {cantidadInvalida && (
          <span className="cine-error-texto">
            La cantidad supera los boletos disponibles ({disponibles}).
          </span>
        )}
      </div>

      {/* Componente Resumen del Total */}
      <ResumenTotal total={Number(totalCalculado || 0)} />

      {/* Botón de Registro */}
      <button 
        type="submit" 
        disabled={cantidadInvalida}
        className="cine-btn-primario"
      >
        Registrar compra
      </button>
    </form>
  );
};