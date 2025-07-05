export default new class ConvertData {
  snakeToCamel(obj: any): any {
    const camelCaseData: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
        camelCaseData[camelKey] = obj[key];
      }
    }

    return camelCaseData;
  }

  camelToSnake(obj: Record<string, any>): Record<string, any> {
    const snakeData: Record<string, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = key.replace(/(?:^|\.?)([A-Z])/g, (x, y) => "_" + y.toLowerCase()).replace(/^_/, "");
        snakeData[snakeKey] = obj[key];
      }
    }

    return snakeData;
  };

  sortObjectByKey(obj: Record<string, any>) {
    // Get the keys of the object and sort them in ASCII order
    const sortedKeys = Object.keys(obj).sort();

    // Construct a new object using the sorted keys
    const sortedObject: Record<string, any> = {};
    sortedKeys.forEach(key => {
      sortedObject[key] = obj[key];
    });

    return sortedObject;
  }
}