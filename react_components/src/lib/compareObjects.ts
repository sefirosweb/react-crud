

export const isObject = (obj: any): boolean => {
    return obj !== null && typeof obj === 'object';
}

export const isEqual = (obj1: any, obj2: any): boolean => {
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
        if (!isEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}