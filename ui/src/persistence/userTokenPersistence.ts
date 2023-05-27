const get = () => localStorage.getItem('userToken');
const set = (value: string) => localStorage.setItem('userToken', value);
const clear = () => localStorage.removeItem('userToken');

export default { get, set, clear };