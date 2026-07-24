import React, { useEffect, useState } from 'react';
import { obtenerFuenteDatos } from '../datos';
import type { Compra, Funcion, Cliente } from '../dominio/modelos';
import { TablaCompras } from '../componentes/TablaCompras';

export const PantallaGestionCompras: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mensaje, setMensaje] = useState<string>('');

  const fuente = obtenerFuenteDatos();

  const cargarDatos = async () => {
    try {
      const [cList, fList, clList] = await Promise.all([
        fuente.listarCompras(),
        fuente.listarFunciones(),
        fuente.listarClientes()
      ]);
      setCompras(cList);
      setFunciones(fList);
      setClientes(clList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCancelar = async (id: number) => {
    try {
      await fuente.cancelarCompra(id);
      setMensaje('Compra cancelada y disponibilidad repuesta con éxito.');
      cargarDatos();
    } catch (err: any) {
      setMensaje(err.message || 'Error al cancelar la compra.');
    }
  };

  return (
    <div className="cine-section">
      <h3>Compras</h3>

      {mensaje && (
        <div className="cine-mensaje-exito" style={{ marginBottom: '16px' }}>
          {mensaje}
        </div>
      )}

      <TablaCompras
        compras={compras}
        funciones={funciones}
        clientes={clientes}
        onCancelar={handleCancelar}
      />
    </div>
  );
};