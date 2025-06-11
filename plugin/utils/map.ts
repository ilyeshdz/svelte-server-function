export function convertMapIntoObject(map: Map<string, any>) {
  const obj: Record<string, any> = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}