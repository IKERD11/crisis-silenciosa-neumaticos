# Guía para Subir el Proyecto a GitHub

## Paso 1: Preparar Git (si no lo tienes instalado)

1. **Descargar Git**: Ve a https://git-scm.com/download/win
2. **Instalar Git**: Ejecuta el instalador con las opciones predeterminadas
3. **Configurar Git** (abre PowerShell):
   ```powershell
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu-email@example.com"
   ```

## Paso 2: Crear Cuenta en GitHub (si no la tienes)

1. Ve a https://github.com
2. Crea una cuenta gratuita
3. Verifica tu email

## Paso 3: Crear Repositorio en GitHub

1. **Inicia sesión** en GitHub
2. **Clic en "New repository"** (botón verde)
3. **Nombre del repositorio**: `reutilizacion-llantas-itc`
4. **Descripción**: "Sitio web sobre reutilización de llantas - Instituto Tecnológico de Cuautla"
5. **Público**: Selecciona "Public" para que sea visible
6. **NO marques** "Add a README file" (ya tenemos uno)
7. **Clic en "Create repository"**

## Paso 4: Subir el Código

Abre **PowerShell** en la carpeta del proyecto y ejecuta:

```powershell
# Navegar a la carpeta del proyecto
cd "c:\Users\ikdop\OneDrive\Desktop\Programas\SitioWebDesarrollo"

# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "Primer commit: Sitio web de reutilización de llantas"

# Agregar repositorio remoto (cambiar 'tu-usuario' por tu nombre de usuario de GitHub)
git remote add origin https://github.com/tu-usuario/reutilizacion-llantas-itc.git

# Cambiar a rama main
git branch -M main

# Subir código a GitHub
git push -u origin main
```

## Paso 5: Configurar GitHub Pages

1. **Ve a tu repositorio** en GitHub
2. **Clic en "Settings"** (en la barra de navegación del repositorio)
3. **Scroll down hasta "Pages"** (en el menú lateral izquierdo)
4. **Source**: Selecciona "Deploy from a branch"
5. **Branch**: Selecciona "main"
6. **Folder**: Selecciona "/ (root)"
7. **Clic en "Save"**

¡Tu sitio estará disponible en aproximadamente 5-10 minutos en:
`https://tu-usuario.github.io/reutilizacion-llantas-itc`

## Paso 6: Actualizar el Sitio (para cambios futuros)

```powershell
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "Descripción de los cambios"

# Subir cambios
git push origin main
```

## Comandos Útiles de Git

```powershell
# Ver estado de archivos
git status

# Ver historial de commits
git log --oneline

# Ver archivos modificados
git diff

# Crear nueva rama
git checkout -b nueva-funcionalidad

# Cambiar de rama
git checkout main

# Fusionar rama
git merge nueva-funcionalidad
```

## Personalización del README

Edita el archivo `README.md` y cambia:
- `tu-usuario` por tu nombre de usuario de GitHub
- URLs de ejemplo por las URLs reales
- Información de contacto por la información real del instituto

## Configurar Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. Crea archivo `CNAME` en la raíz del proyecto:
   ```
   www.tudominio.com
   ```

2. Configura DNS de tu dominio:
   - Tipo: CNAME
   - Host: www
   - Valor: tu-usuario.github.io

## Solución de Problemas Comunes

### Error de autenticación
Si te pide usuario y contraseña, usa un **Personal Access Token**:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Marca "repo" scope
4. Copia el token y úsalo como contraseña

### Error 404 en GitHub Pages
- Verifica que `index.html` esté en la raíz
- Espera 5-10 minutos después de la configuración
- Verifica la configuración en Settings → Pages

### Archivos no se suben
```powershell
# Verificar que los archivos estén añadidos
git status

# Si aparecen en rojo, agregarlos
git add nombre-archivo.html

# O agregar todos
git add .
```

## Siguientes Pasos Recomendados

1. **Agregar imágenes reales** del Instituto y proyectos
2. **Personalizar información** de contacto
3. **Configurar Google Analytics** para métricas
4. **Optimizar SEO** con meta tags apropiados
5. **Agregar más contenido** de investigación

## Recursos Adicionales

- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Markdown Guide](https://www.markdownguide.org/)

¡Listo! Tu sitio web estará online y accesible desde cualquier parte del mundo.
