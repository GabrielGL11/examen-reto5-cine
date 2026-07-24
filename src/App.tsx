import { useState } from 'react';
import './styles/cine.css';
import { PantallaListado } from './pantallas/PantallaListado';
import { PantallaCrearCompra } from './pantallas/PantallaCrearCompra';

export function App() {
  // Cambiamos el estado inicial a 'listado' para que muestre la tabla de compras primero, o déjalo en 'crear' si prefieres
  const [pantalla, setPantalla] = useState<'listado' | 'crear'>('listado');

  const claseCard = pantalla === 'listado' ? 'cine-card cine-card-anancha' : 'cine-card';

  return (
    <div className={claseCard}>
      <header className="cine-header">
        <h1>Cine Estrella</h1>
        <button 
          onClick={() => setPantalla(pantalla === 'listado' ? 'crear' : 'listado')}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '14px', 
            color: '#cbd5e1', 
            cursor: 'pointer', 
            textDecoration: 'underline' 
          }}
        >
          {pantalla === 'listado' ? '+ Ir a Nueva Compra' : 'Ver Boletería'}
        </button>
      </header>

      <main className="cine-body">
        {pantalla === 'listado' ? <PantallaListado /> : <PantallaCrearCompra />}
      </main>
    </div>
  );
}

export default App;