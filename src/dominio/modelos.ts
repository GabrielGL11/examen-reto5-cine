export interface Funcion {
  id: number;
  titulo: string;
  precio: number;
  disponibles: number;
  estado: 'Activo' | 'Inactivo' | string;
}

export interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
}

export type NuevoCliente = Omit<Cliente, 'id'>;

export interface Compra {
  id: number;
  clienteId: number;
  clienteNombre?: string;
  funcionId: number;
  funcionTitulo?: string;
  cantidad: number;
  total: number;
  descuentoAplicado?: boolean;
  estado: 'PENDIENTE' | 'USADA' | 'CANCELADA' | string;
}

export type NuevaCompra = {
  clienteId: number;
  funcionId: number;
  cantidad: number;
};