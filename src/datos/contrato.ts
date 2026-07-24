// ARCHIVO BLOQUEADO — NO MODIFICAR
// ============================================================================
// CONTRATO DE LA CAPA DE DATOS — Temática: CINE
// ----------------------------------------------------------------------------
// Las tres fuentes de datos (memoria, json, api) implementan ESTA interfaz.
// El resto de la aplicación consume la fuente sin saber cuál hay detrás.
//
// Los tipos se importan desde src/dominio: usted debe definirlos ahí,
// derivándolos de las pantallas. Este archivo compila contra sus nombres.
// ============================================================================
import type {
  Funcion,
  Cliente,
  NuevoCliente,
  Compra,
  NuevaCompra,
} from "../dominio/modelos";

export interface FuenteDatos {
  /** Catálogo completo, incluidos los registros inactivos. */
  listarFunciones(): Promise<Funcion[]>;

  /** Todos los clientes registrados. */
  listarClientes(): Promise<Cliente[]>;

  /** Crea un cliente y lo devuelve con su id asignado. */
  crearCliente(datos: NuevoCliente): Promise<Cliente>;

  /** Todas las transacciones, en cualquier estado. */
  listarCompras(): Promise<Compra[]>;

  /**
   * Crea una transacción aplicando las reglas de negocio observables en las
   * pantallas: el registro debe estar activo y el cliente existir; la cantidad
   * no puede superar la disponibilidad; el total lleva descuento desde 5
   * unidades; y al crear se descuenta la disponibilidad.
   * Ante una regla incumplida, rechaza la promesa con un Error descriptivo.
   */
  crearCompra(datos: NuevaCompra): Promise<Compra>;

  /**
   * Acción "Cancelar": solo se permite en el estado inicial (PENDIENTE,
   * pasa a CANCELADA) y, al aplicarla, repone la disponibilidad. Devuelve el
   * registro actualizado.
   * Ante una regla incumplida, rechaza la promesa con un Error descriptivo.
   */
  cancelarCompra(id: number): Promise<Compra>;
}
