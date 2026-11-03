// Keep tests independent of Node's optional native Web Storage implementation.
const storageValues = new Map<string, string>();
const testStorage: Storage = {
  get length() { return storageValues.size; },
  clear() { storageValues.clear(); },
  getItem(key) { return storageValues.get(String(key)) ?? null; },
  setItem(key, value) { storageValues.set(String(key), String(value)); },
  removeItem(key) { storageValues.delete(String(key)); },
  key(index) { return [...storageValues.keys()][index] ?? null; },
};
Object.defineProperty(window, 'localStorage', { configurable: true, value: testStorage });
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: testStorage });

Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true);

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
