export const isThereAnyData = <T>(data: T): T | string => {
  if (!data) {
    return "Nan";
  }

  return data;
};
