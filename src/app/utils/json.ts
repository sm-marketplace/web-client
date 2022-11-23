export const validJSON = (data: string) => {
  try {
    JSON.parse(data);
  } catch (e) {
      return false;
  }
  return true;
}

export const tryParseJSON = (data: string) => {
  
  let result = data;
  
  try {
    result = JSON.parse(data);
  } catch (e) {}

  return result;
}