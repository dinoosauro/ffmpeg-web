/**
 * Tracks all the changes made to an Object
 * @param obj the object that should be tracked
 * @param key the LocalStorage key where the new file will be saved
 * @param mainObj the "root" of the object. You should NOT put anything here, since it's used only by the UpdateStorage function while iterating nested objects.
 * @returns the Proxy of that object, that should be set as the new value of the Object
 */
export default function UpdateStorage(obj: any, key: string, mainObj?: any) {
    const proxy = new Proxy(obj, {
        set: (obj, prop, value) => {
            obj[prop] = value;
            localStorage.setItem(key, JSON.stringify(mainObj ?? proxy));
            return true;
        }
    });
    for (const item in proxy) { // If one of the children is an Object, let's set the proxy also to it
        if (typeof proxy[item] === "object" && !(proxy[item] instanceof Uint8Array) && !(proxy[item] instanceof Blob) && !(proxy[item] instanceof File)) proxy[item] = UpdateStorage(proxy[item], key, mainObj ?? proxy)
    }
    return proxy;
}

