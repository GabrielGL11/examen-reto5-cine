export const fuenteMemoria = {
  async listarFunciones() {
    return [];
  },
  async listarClientes() {
    return [];
  },
  async crearCliente() {
    throw new Error("No implementado en memoria");
  },
  async listarCompras() {
    return [];
  },
  async crearCompra() {
    throw new Error("No implementado en memoria");
  },
  async cancelarCompra() {
    throw new Error("No implementado en memoria");
  }
};