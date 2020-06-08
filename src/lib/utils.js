/**
 * Applys the Array.map function to the 'map' data structure
*/
export const mapMap = (map, cb) => Array.from(map.keys()).map(id => cb(map.get(id)));