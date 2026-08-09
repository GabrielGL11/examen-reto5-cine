import React, { useEffect, useState } from 'react';
import { obtenerFuenteDatos } from '../datos';
import type { Compra, Funcion } from '../dominio/modelos';
import { Badge } from '../componentes/Badge';

export const PantallaListado: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const fuente = obtenerFuenteDatos();

  const cargarDatos = async () => {
    try {
      const dataCompras = await fuente.listarCompras?.();
      if (dataCompras) {
        const guardadasLocal = JSON.parse(localStorage.getItem('compras_estado_local') || '{}');
        const comprasConEstado = dataCompras.map((c: any) => ({
          ...c,
          estado: guardadasLocal[c.id] || c.estado
        }));
        setCompras(comprasConEstado);
      }

      const dataFunciones = await fuente.listarFunciones();
      if (dataFunciones) setFunciones(dataFunciones);

      const dataClientes = await fuente.listarClientes?.();
      if (dataClientes) setClientes(dataClientes);
    } catch (err) {
      console.error("Error al cargar datos", err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCancelar = async (id: number) => {
    try {
      await fuente.cancelarCompra?.(id);
      const guardadasLocal = JSON.parse(localStorage.getItem('compras_estado_local') || '{}');
      delete guardadasLocal[id];
      localStorage.setItem('compras_estado_local', JSON.stringify(guardadasLocal));
      
      cargarDatos();
    } catch (err) {
      console.error("Error al cancelar la compra", err);
    }
  };

  const handleMarcarUsada = async (id: number) => {
    try {
      const guardadasLocal = JSON.parse(localStorage.getItem('compras_estado_local') || '{}');
      guardadasLocal[id] = 'USADA';
      localStorage.setItem('compras_estado_local', JSON.stringify(guardadasLocal));

      setCompras(prev => prev.map(c => c.id === id ? { ...c, estado: 'USADA' } : c));
    } catch (err) {
      console.error("Error al marcar como usada", err);
    }
  };

  return (
    <div className="cine-section" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Sección 1: Compras */}
      <div>
        <h3 className="text-lg font-bold mb-4">Compras</h3>
        <div className="overflow-x-auto">
          <table className="cine-tabla">
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
              {compras.map((c: any) => {
                const clienteObj = clientes.find(cl => cl.id === c.clienteId);
                const funcionObj = funciones.find((f: any) => f.id === c.funcionId || f.id === c.funcion?.id);
                
                const nombreCliente = c.cliente?.nombre || clienteObj?.nombre || c.nombreCliente || `Cliente #${c.clienteId}`;
                const nombreFuncion = c.funcion?.nombre || (funcionObj as any)?.nombre || (funcionObj as any)?.titulo || `Función #${c.funcionId}`;
                const totalSeguro = Number(c.total || 0);
                const estado = (c.estado || 'PENDIENTE').toUpperCase();

                return (
                  <tr key={c.id}>
                    <td>{nombreCliente}</td>
                    <td>{nombreFuncion}</td>
                    <td>{c.cantidad}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>${totalSeguro.toFixed(2)}</span>
                        {c.descuentoAplicado && (
                          <span style={{ 
                            background: '#cffafe', 
                            color: '#0e7490', 
                            padding: '2px 6px', 
                            borderRadius: '12px', 
                            fontSize: '11px', 
                            fontWeight: 'bold' 
                          }}>
                            -10%
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`cine-badge cine-badge-${estado.toLowerCase()}`}>
                        {estado}
                      </span>
                    </td>
                    <td>
                      {estado === 'PENDIENTE' ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button 
                            onClick={() => handleMarcarUsada(c.id)}
                            style={{ 
                              background: '#e0f2fe', 
                              color: '#0369a1', 
                              border: 'none', 
                              padding: '4px 8px', 
                              borderRadius: '4px', 
                              cursor: 'pointer', 
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          >
                            Usar
                          </button>
                          <button 
                            onClick={() => handleCancelar(c.id)}
                            className="cine-btn-danger"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : estado === 'USADA' ? (
                        <button 
                          disabled
                          style={{ 
                            background: 'transparent', 
                            border: '1px solid #cbd5e1', 
                            color: '#94a3b8', 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            cursor: 'not-allowed', 
                            fontSize: '12px' 
                          }}
                        >
                          Cancelar
                        </button>
                      ) : (
                        <span className="cine-texto-muted" style={{ fontSize: '12px', fontStyle: 'italic' }}>
                          2 entradas repuestas a la disponibilidad
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #e2e8f0' }} />

      {/* Sección 2: Catálogo de Funciones */}
      <div>
        <h3 className="text-lg font-bold mb-4">Catálogo de funciones</h3>
        <div className="overflow-x-auto">
          <table className="cine-tabla">
            <thead>
              <tr>
                <th>Función</th>
                <th>Precio</th>
                <th>Disponibles</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {funciones.map((f: any) => (
                <tr key={f.id}>
                  <td>{f.titulo || f.nombre || f.pelicula || `Función #${f.id}`}</td>
                  <td>${Number(f.precio || f.precioUnitario || 0).toFixed(2)}</td>
                  <td>{f.disponibles}</td>
                  <td>
                    <Badge estado={f.estado || f.status || 'ACTIVA'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};