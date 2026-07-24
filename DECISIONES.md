# Decisiones de Diseño y Arquitectura - Examen Reto 5

1. **Estructura Modular:** Se organizó el código en carpetas independientes (`dominio`, `datos`, `componentes`, `pantallas` y `styles`) para separar contratos, fuentes de almacenamiento, componentes reutilizables y vistas de usuario.
2. **Capa de Datos Polimórfica:** Se implementó un contrato (`FuenteDatos`) que permite intercambiar entre almacenamiento en memoria, API REST o archivos JSON de forma transparente.
3. **Tipado Estricto en Español:** Se centralizaron las entidades (`Funcion`, `Cliente`, `Compra`) e interfaces del negocio en el archivo `modelos.ts` del dominio, garantizando seguridad de tipos en compilación.
4. **Diseño Visual Componentizado:** Se desarrolló el componente reutilizable `Badge` para el control dinámico de estados con estilos limpios y profesionales.
5. **Estilos Centralizados:** Se aplicó una hoja de estilos dedicada (`cine.css`) para replicar fielmente la interfaz visual solicitada, manteniendo una estructura limpia y mantenible.