# Script para forzar recarga de imágenes
# Limpia el caché y abre el navegador en modo incógnito

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FORZAR RECARGA DE IMÁGENES" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ruta del proyecto
$projectPath = "c:\Users\ikdop\OneDrive\Desktop\Programas\SitioWebDesarrollo"
$indexPath = Join-Path $projectPath "index.html"
$verifyPath = Join-Path $projectPath "verificar-imagenes.html"

# Verificar que los archivos de imagen existen
Write-Host "1. Verificando archivos de imagen..." -ForegroundColor Green
$imagenes = @(
    "assets\images\Mesa.png",
    "assets\images\Jardinera.png",
    "assets\images\Bancos.jpg"
)

foreach ($img in $imagenes) {
    $imgPath = Join-Path $projectPath $img
    if (Test-Path $imgPath) {
        $size = (Get-Item $imgPath).Length / 1KB
        Write-Host "  ✓ $img ($('{0:N2}' -f $size) KB)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $img - NO ENCONTRADA" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "2. Opciones de recarga:" -ForegroundColor Green
Write-Host ""
Write-Host "  A) Abrir página de verificación en modo normal" -ForegroundColor Yellow
Write-Host "  B) Abrir index.html en modo incógnito (Chrome)" -ForegroundColor Yellow
Write-Host "  C) Abrir index.html en modo incógnito (Edge)" -ForegroundColor Yellow
Write-Host "  D) Limpiar caché de Chrome y abrir" -ForegroundColor Yellow
Write-Host "  E) Limpiar caché de Edge y abrir" -ForegroundColor Yellow
Write-Host "  V) Solo verificar (abrir verificar-imagenes.html)" -ForegroundColor Yellow
Write-Host ""

$opcion = Read-Host "Selecciona una opción (A/B/C/D/E/V)"

switch ($opcion.ToUpper()) {
    "A" {
        Write-Host "Abriendo página de verificación..." -ForegroundColor Cyan
        Start-Process $verifyPath
    }
    "B" {
        Write-Host "Abriendo en Chrome modo incógnito..." -ForegroundColor Cyan
        $chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
        if (Test-Path $chrome) {
            Start-Process $chrome -ArgumentList "--incognito", $indexPath
        } else {
            Write-Host "Chrome no encontrado. Abriendo en navegador predeterminado..." -ForegroundColor Yellow
            Start-Process $indexPath
        }
    }
    "C" {
        Write-Host "Abriendo en Edge modo incógnito..." -ForegroundColor Cyan
        Start-Process "msedge.exe" -ArgumentList "-inprivate", $indexPath
    }
    "D" {
        Write-Host "Limpiando caché de Chrome..." -ForegroundColor Cyan
        $chromeCachePath = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache"
        if (Test-Path $chromeCachePath) {
            Remove-Item "$chromeCachePath\*" -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "  ✓ Caché de Chrome limpiado" -ForegroundColor Green
        }
        Write-Host "Abriendo Chrome..." -ForegroundColor Cyan
        $chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
        Start-Sleep -Seconds 1
        Start-Process $chrome -ArgumentList $indexPath
    }
    "E" {
        Write-Host "Limpiando caché de Edge..." -ForegroundColor Cyan
        $edgeCachePath = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache"
        if (Test-Path $edgeCachePath) {
            Remove-Item "$edgeCachePath\*" -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "  ✓ Caché de Edge limpiado" -ForegroundColor Green
        }
        Write-Host "Abriendo Edge..." -ForegroundColor Cyan
        Start-Sleep -Seconds 1
        Start-Process "msedge.exe" -ArgumentList $indexPath
    }
    "V" {
        Write-Host "Abriendo página de verificación..." -ForegroundColor Cyan
        Start-Process $verifyPath
    }
    default {
        Write-Host "Opción no válida. Abriendo página de verificación..." -ForegroundColor Yellow
        Start-Process $verifyPath
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "INSTRUCCIONES:" -ForegroundColor Yellow
Write-Host "1. En el navegador, presiona Ctrl + F5" -ForegroundColor White
Write-Host "2. Ve a la sección 'Proyectos en Desarrollo'" -ForegroundColor White
Write-Host "3. Verifica que las imágenes sean:" -ForegroundColor White
Write-Host "   - Mesa: neumáticos con tapa de madera" -ForegroundColor White
Write-Host "   - Jardinera: neumáticos coloridos con flores" -ForegroundColor White
Write-Host "   - Bancos: sillas con tejido naranja" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
