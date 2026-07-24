import React, { useEffect, useState } from 'react';
import { obtenerFuenteDatos } from '../datos';
import type { Funcion, Cliente } from '../dominio/modelos';
import { FormularioCompra } from '../componentes/FormularioCompra';

export const PantallaCrearCompra: React.FC = () => {
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  const [funcionId, setFuncionId] = useState<number>(0);
  const [clienteId, setClienteId] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(1);
  const [mensaje, setMensaje] = useState<string>('');

  // Estados para el modal o sección de Nuevo Cliente
  const [mostrarModalCliente, setMostrarModalCliente] = useState<boolean>(false);
  const [nuevoNombre, setNuevoNombre] = useState<string>('');
  const [nuevoCedula, setNuevoCedula] = useState<string>('');

  const fuente = obtenerFuenteDatos();

  const cargarDatos = () => {
    Promise.all([
      fuente.listarFunciones(),
      fuente.listarClientes?.() ?? Promise.resolve([])
    ]).then(([fList, cList]) => {
      const activas = fList.filter(f => 
        (f as any).activo === true || 
        f.estado === 'Activo' || 
        f.estado === 'activo'
      );
      
      const funcionesFinales = activas.length > 0 ? activas : fList;

      setFunciones(funcionesFinales);
      setClientes(cList);
      
      if (funcionesFinales.length > 0 && !funcionId) setFuncionId(funcionesFinales[0].id);
      if (cList.length > 0 && !clienteId) setClienteId(cList[0].id);
    }).catch(console.error);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCrearCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;

    try {
      if (fuente.crearCliente) {
        const nuevo = await fuente.crearCliente({
          nombre: nuevoNombre,
          cedula: nuevoCedula
        });
        // Recargar clientes y seleccionar el nuevo
        const cList = await fuente.listarClientes?.() ?? [];
        setClientes(cList);
        if (nuevo && nuevo.id) {
          setClienteId(nuevo.id);
        } else if (cList.length > 0) {
          setClienteId(cList[cList.length - 1].id);
        }
      }
      setNuevoNombre('');
      setNuevoCedula('');
      setMostrarModalCliente(false);
      setMensaje('¡Cliente creado exitosamente!');
    } catch (err) {
      setMensaje('Error al crear el cliente.');
    }
  };

  const funcionSeleccionada = funciones.find(f => f.id === Number(funcionId));
  const precioUnitario = funcionSeleccionada 
    ? Number((funcionSeleccionada as any).precioUnitario ?? funcionSeleccionada.precio ?? 0) 
    : 0;
    
  const disponibles = funcionSeleccionada ? funcionSeleccionada.disponibles : 0;
  const subtotal = cantidad * precioUnitario;
  const aplicaDescuento = cantidad >= 5;
  const totalCalculado = aplicaDescuento ? subtotal * 0.9 : subtotal;

  const cantidadInvalida = cantidad <= 0 || cantidad > disponibles;
  const sinDatos = funciones.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cantidadInvalida || sinDatos) return;

    try {
      await fuente.crearCompra({
        clienteId: Number(clienteId),
        funcionId: Number(funcionId),
        cantidad: Number(cantidad)
      });
      setMensaje('¡Compra registrada exitosamente!');
      cargarDatos(); // Actualizar disponibilidades
    } catch (err) {
      setMensaje('Error al registrar la compra.');
    }
  };

  return (
    <div className="cine-section">
      <h3>Nueva compra</h3>

      {sinDatos ? (
        <div className="cine-alerta-error">
          ⚠️ No se puede registrar: faltan funciones activas.
        </div>
      ) : (
        <>
          <FormularioCompra 
            funciones={funciones}
            clientes={clientes}
            funcionId={funcionId}
            clienteId={clienteId}
            cantidad={cantidad}
            disponibles={disponibles}
            totalCalculado={totalCalculado}
            cantidadInvalida={cantidadInvalida}
            onCambiarFuncion={setFuncionId}
            onCambiarCliente={setClienteId}
            onCambiarCantidad={setCantidad}
            onSubmit={handleSubmit}
          />

          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <button 
              type="button"
              onClick={() => setMostrarModalCliente(!mostrarModalCliente)}
              style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
            >
              {mostrarModalCliente ? 'Ocultar formulario de cliente' : '+ Registrar nuevo cliente'}
            </button>
          </div>

          {mostrarModalCliente && (
            onSubmitFormCliente(handleCrearCliente, nuevoNombre, setNuevoNombre, nuevoCedula, setNuevoCedula)
          )}
        </>
      )}

      {mensaje && <p className="cine-mensaje-exito" style={{ marginTop: '10px' }}>{mensaje}</p>}
    </div>
  );
};

// Función auxiliar para renderizar el formulario rápido de cliente
function onSubmitFormCliente(onSubmit: any, nombre: string, setNombre: any, cedula: string, setCedula: any) {
  return (
    <form onSubmit={onSubmit} style={{ marginTop: '15px', padding: '15px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
      <h4 style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>Nuevo Cliente</h4>
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Nombre:</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={e => setNombre(e.target.value)} 
          required 
          style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Cédula:</label>
        <input 
          type="text" 
          value={cedula} 
          onChange={e => setCedula(e.target.value)} 
          style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
      </div>
      <button type="submit" style={{ background: '#0284c7', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
        Guardar Cliente
      </button>
    </form>
  );
}