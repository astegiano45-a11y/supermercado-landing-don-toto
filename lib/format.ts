// Formato de moneda compartido — un solo lugar para no repetir el
// toLocaleString en cada componente que muestra precios.
export const formatoPeso = (valor: number) => `$${valor.toLocaleString("es-AR")}`;
