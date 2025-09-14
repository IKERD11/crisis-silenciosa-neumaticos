#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor web para el sitio del Tecnológico Nacional de México
Instituto Tecnológico de Cuautla - Proyecto de Neumáticos Usados
"""

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os
import mimetypes
from datetime import datetime
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Crear aplicación Flask
app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# Configuración
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Sin cache durante desarrollo

# Directorio base del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Configurar tipos MIME adicionales
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('image/svg+xml', '.svg')

@app.route('/')
def index():
    """Página principal"""
    try:
        return send_from_directory(BASE_DIR, 'index.html')
    except Exception as e:
        logger.error(f"Error sirviendo index.html: {e}")
        return jsonify({"error": "No se pudo cargar la página principal"}), 500

@app.route('/<path:filename>')
def serve_static(filename):
    """Servir archivos estáticos"""
    try:
        # Verificar si el archivo existe
        file_path = os.path.join(BASE_DIR, filename)
        if os.path.exists(file_path):
            # Determinar el directorio correcto
            directory = os.path.dirname(file_path)
            if not directory:
                directory = BASE_DIR
            
            basename = os.path.basename(filename)
            
            # Configurar headers de cache para recursos estáticos
            response = send_from_directory(directory, basename)
            
            # Headers de seguridad
            response.headers['X-Content-Type-Options'] = 'nosniff'
            response.headers['X-Frame-Options'] = 'SAMEORIGIN'
            
            # Headers anti-caché para desarrollo
            response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            response.headers['Pragma'] = 'no-cache'
            response.headers['Expires'] = '0'
            
            return response
        else:
            logger.warning(f"Archivo no encontrado: {filename}")
            # Si el archivo no existe, servir index.html (SPA behavior)
            return send_from_directory(BASE_DIR, 'index.html')
            
    except Exception as e:
        logger.error(f"Error sirviendo archivo {filename}: {e}")
        return jsonify({"error": f"No se pudo cargar el archivo: {filename}"}), 404

@app.route('/api/health')
def health_check():
    """Endpoint de salud del servidor"""
    return jsonify({
        "status": "OK",
        "timestamp": datetime.now().isoformat(),
        "message": "Servidor del TecNM funcionando correctamente",
        "version": "1.0.0"
    })

@app.route('/api/info')
def server_info():
    """Información del servidor"""
    return jsonify({
        "proyecto": "La Crisis Silenciosa: Neumáticos Usados",
        "institucion": "Instituto Tecnológico de Cuautla",
        "tecnm": "Tecnológico Nacional de México",
        "servidor": "Flask Python Server",
        "directorio": BASE_DIR,
        "archivos_disponibles": [f for f in os.listdir(BASE_DIR) if os.path.isfile(os.path.join(BASE_DIR, f))]
    })

@app.errorhandler(404)
def not_found(error):
    """Manejo de errores 404"""
    logger.warning(f"404 - Recurso no encontrado: {request.url}")
    # Para una SPA, redirigir a index.html
    return send_from_directory(BASE_DIR, 'index.html')

@app.errorhandler(500)
def internal_error(error):
    """Manejo de errores 500"""
    logger.error(f"500 - Error interno del servidor: {error}")
    return jsonify({
        "error": "Error interno del servidor",
        "timestamp": datetime.now().isoformat()
    }), 500

if __name__ == '__main__':
    # Información de inicio
    print("🏫 Tecnológico Nacional de México - Instituto Tecnológico de Cuautla")
    print("🌿 Proyecto: La Crisis Silenciosa - Neumáticos Usados")
    print("🚀 Iniciando servidor Flask...")
    print(f"📁 Directorio base: {BASE_DIR}")
    print(f"🕐 Hora de inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    # Listar archivos disponibles
    files = [f for f in os.listdir(BASE_DIR) if os.path.isfile(os.path.join(BASE_DIR, f))]
    print(f"📄 Archivos disponibles: {len(files)}")
    for file in sorted(files)[:10]:  # Mostrar solo los primeros 10
        print(f"   • {file}")
    if len(files) > 10:
        print(f"   ... y {len(files) - 10} archivos más")
    
    print("=" * 60)
    print("🌐 Servidor disponible en:")
    print("   • http://localhost:5000")
    print("   • http://127.0.0.1:5000")
    print("\n📋 Endpoints disponibles:")
    print("   • /              - Página principal")
    print("   • /api/health    - Estado del servidor")
    print("   • /api/info      - Información del proyecto")
    print("\n⏹️  Presiona Ctrl+C para detener el servidor")
    print("=" * 60)

if __name__ == '__main__':
    # Configuración para desarrollo y producción
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    
    # Iniciar servidor
    try:
        app.run(
            host='0.0.0.0',
            port=port,
            debug=debug_mode,
            threaded=True
        )
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except Exception as e:
        print(f"\n❌ Error al iniciar el servidor: {e}")
