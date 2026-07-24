import { RUTA_SEMILLAS_JSON } from "./configuracion";

export const fuenteJson = {
  async listarFunciones() {
    const res = await fetch(RUTA_SEMILLAS_JSON);
    const data = await res.json();
    return data.funciones || [];
  },
  async listarClientes() {
    const res = await fetch(RUTA_SEMILLAS_JSON);
    const data = await res.json();
    return data.clientes || [];
  },
  async crearCliente() {
    throw new Error("No implementado en modo JSON estático");
  },
  async listarCompras() {
    const res = await fetch(RUTA_SEMILLAS_JSON);
    const data = await res.json();
    return data.compras || [];
  },
  async crearCompra() {
    throw new Error("No implementado en modo JSON estático");
  },
  async cancelarCompra() {
    throw new Error("No implementado en modo JSON estático");
  }
};