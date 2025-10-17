// Script de depuración para verificar la carga de imágenes
console.log('=== DEBUG: Verificación de imágenes ===');

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.development-image img');
    
    console.log(`Total de imágenes encontradas: ${images.length}`);
    
    images.forEach((img, index) => {
        console.log(`\nImagen ${index + 1}:`);
        console.log(`- Src: ${img.src}`);
        console.log(`- Alt: ${img.alt}`);
        console.log(`- Complete: ${img.complete}`);
        console.log(`- Natural Width: ${img.naturalWidth}`);
        console.log(`- Natural Height: ${img.naturalHeight}`);
        
        img.addEventListener('load', function() {
            console.log(`✅ Imagen ${index + 1} cargada exitosamente`);
            console.log(`   Dimensiones: ${this.naturalWidth}x${this.naturalHeight}`);
        });
        
        img.addEventListener('error', function() {
            console.error(`❌ Error al cargar imagen ${index + 1}`);
            console.error(`   Ruta: ${this.src}`);
        });
    });
    
    // Verificar que las imágenes se muestren
    setTimeout(() => {
        console.log('\n=== Estado después de 2 segundos ===');
        images.forEach((img, index) => {
            const isVisible = img.offsetWidth > 0 && img.offsetHeight > 0;
            console.log(`Imagen ${index + 1}: ${isVisible ? '✅ Visible' : '❌ No visible'}`);
            if (!isVisible) {
                console.log(`  Computed style:`, window.getComputedStyle(img));
            }
        });
    }, 2000);
});
