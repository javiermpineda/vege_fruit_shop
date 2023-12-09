
// Crea un nuevo mapa utilizando Leaflet
const map = L.map('map').setView([0, 0], 15);

// Añade una capa de mapa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Obtiene la ubicación actual del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const latlng = [position.coords.latitude, position.coords.longitude];

            // Centra el mapa en la ubicación actual
            map.setView(latlng);

            // Agrega un marcador en la ubicación actual
            L.marker(latlng).addTo(map)
                .bindPopup('Ubicación Actual')
                .openPopup();
        },
        () => {
            // Manejo de errores al obtener la ubicación
            alert('No se pudo obtener la ubicación actual.');
        }
    );
} else {
    // El navegador no soporta la geolocalización
    alert('Tu navegador no soporta la geolocalización.');
}