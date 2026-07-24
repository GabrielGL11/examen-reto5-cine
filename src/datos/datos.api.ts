import { URL_API } from "./configuracion";

export const fuenteApi = {
  async listarFunciones() {
    const res = await fetch(`${URL_API}/funciones`);
    if (!res.ok) throw new Error('Error al listar funciones');
    return res.json();
  },

  async listarClientes() {
    const res = await fetch(`${URL_API}/clientes`);
    if (!res.ok) throw new Error('Error al listar clientes');
    return res.json();
  },

  async crearCliente(cliente: { nombre: string; cedula: string; telefono?: string }) {
    const res = await fetch(`${URL_API}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al crear cliente');
    }
    return res.json();
  },

  async listarCompras() {
    const res = await fetch(`${URL_API}/compras`);
    if (!res.ok) throw new Error('Error al listar compras');
    return res.json();
  },

  async crearCompra(compra: { funcionId: number; clienteId: number; cantidad: number }) {
    const res = await fetch(`${URL_API}/compras`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(compra)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al registrar la compra');
    }
    return res.json();
  },

  async cancelarCompra(id: number) {
    const res = await fetch(`${URL_API}/compras/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'CANCELADA' })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al cancelar la compra');
    }
    return res.json();
  }
};