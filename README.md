# Examen Práctico Final — IS-403 · Temática 05: CINE

Este paquete contiene la estructura, configuración y código operativo para el desarrollo y ejecución del sistema de compras **Cine Estrella**, integrado con el servidor mock local y componentes en React con TypeScript.

## 1. Qué hay en este paquete

| Carpeta / Archivo | Contenido |
|---|---|
| `src/pantallas/` | Vistas principales de la aplicación (Listado, etc.). |
| `src/mock/` | El servidor de datos local (`servidor-mock.cjs`) y las semillas (`semillas.json`). |
| `src/datos/` | `contrato.ts`, fábrica de selección de fuentes y configuración de entorno. |
| `src/dominio/` | Interfaces de modelos (`modelos.ts`: `Funcion`, `Cliente`, `Compra`). |

## 2. Antes de escribir código

Observe las pantallas con detenimiento. Las entidades, los campos, los textos y las reglas de negocio están definidos en la especificación visual y en las semillas del proyecto.

## 3. Primeros pasos y configuración

1. Configure su proyecto utilizando Vite con React y TypeScript (`react-ts`).
2. Asegúrese de mantener la estructura exigida en la carpeta `src/`.
3. Configure su entorno para el consumo de datos a través de la fábrica centralizada.

## 4. El dominio (`src/dominio/modelos.ts`)

Define los tipos y contratos de datos del negocio:
* **`Funcion`**: Contiene los datos de las funciones de cine (`id`, `nombre`/`titulo`, `precioUnitario`, `disponibles`, `activo`).
* **`Cliente`**: Datos del cliente (`id`, `nombre`, `cedula`, `telefono`).
* **`Compra`**: Transacciones registradas (`id`, `funcionId`, `clienteId`, `cantidad`, `total`, `descuentoAplicado`, `estado`).

## 5. Las fuentes de datos

La aplicación consume los datos de forma abstrayéndose de la fuente mediante la fábrica en `src/datos/index.ts`:
* **`memoria`**: Datos en memoria local y mutaciones en arreglos de JavaScript.
* **`json`**: Carga de semillas mediante fetch estático.
* **`api`**: Operaciones mediante REST contra el servidor mock de Node.js.

## 6. El servidor mock (modo `api`)

Para poner en marcha el servidor de datos local, ejecute el siguiente comando en la terminal:

```bash
node src/mock/servidor-mock.cjs src/mock/semillas.json