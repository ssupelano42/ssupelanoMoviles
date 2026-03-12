export type Category = 'restaurant' | 'cafe' | 'parque' | 'museo' | 'shopping' | 'hotel';

export interface Place {
  id: string;
  name: string;
  category: Category;
  description: string;
  rating: number;
  address: string;
  openNow: boolean;
}

export const CATEGORIES: Record<Category, { icon: string; color: string; label: string }> = {
  restaurant: { icon: '🍽️', color: '#EF4444', label: 'Restaurante' },
  cafe:        { icon: '☕', color: '#D97706', label: 'Café' },
  parque:      { icon: '🌿', color: '#22C55E', label: 'Parque' },
  museo:       { icon: '🏛️', color: '#8B5CF6', label: 'Museo' },
  shopping:    { icon: '🛍️', color: '#EC4899', label: 'Shopping' },
  hotel:       { icon: '🏨', color: '#3B82F6', label: 'Hotel' },
};

export const PLACES: Place[] = [
  { id: '1', name: 'Restaurante La Candelaria', category: 'restaurant', description: 'Cocina tradicional colombiana en el corazón histórico de Bogotá.', rating: 4.5, address: 'Cra. 8 #9-82, La Candelaria', openNow: true },
  { id: '2', name: 'Café Quindío', category: 'cafe', description: 'El mejor café de origen colombiano con vista al Parque Santander.', rating: 4.8, address: 'Cra. 7 #17-01, Centro', openNow: true },
  { id: '3', name: 'Parque Nacional', category: 'parque', description: 'Pulmón verde de la ciudad, ideal para caminar y hacer ejercicio.', rating: 4.6, address: 'Cra. 7 con Calle 36, Chapinero', openNow: true },
  { id: '4', name: 'Museo del Oro', category: 'museo', description: 'Una de las colecciones de orfebrería precolombina más importantes del mundo.', rating: 4.9, address: 'Cra. 6 #15-88, Centro', openNow: false },
  { id: '5', name: 'Centro Comercial Andino', category: 'shopping', description: 'El mall más exclusivo de Bogotá en la Zona Rosa.', rating: 4.4, address: 'Cra. 11 #82-71, Zona Rosa', openNow: true },
  { id: '6', name: 'Hotel Casa Medina', category: 'hotel', description: 'Hotel boutique con arquitectura colonial española en Chapinero.', rating: 4.7, address: 'Cra. 7 #69A-22, Chapinero', openNow: true },
  { id: '7', name: 'Mercado de la Perseverancia', category: 'shopping', description: 'Mercado tradicional con frutas, verduras y comida típica bogotana.', rating: 4.2, address: 'Cra. 5 #30-17, Chapinero', openNow: true },
  { id: '8', name: 'Restaurante Criterion', category: 'restaurant', description: 'Alta cocina internacional con los mejores chefs de Colombia.', rating: 4.8, address: 'Cra. 11 #85-10, Zona Rosa', openNow: false },
];
