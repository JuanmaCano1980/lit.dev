/* global console */
import './styles.css';
import './components/home/marvel-app.js';

// Inicializar personajes al arrancar la app
import { characters } from './services/characters.js';

// Cargar personajes al inicio
characters
  .initialize()
  .then((result) => {
    console.log(
      `🎉 App inicializada con ${result.characters.length} personajes`
    );
  })
  .catch((error) => {
    console.error('❌ Error al inicializar personajes:', error);
  });
