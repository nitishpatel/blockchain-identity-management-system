const get = (): string | null => {
    return localStorage.getItem('userName');
};

const set = (value: string): void => {
    localStorage.setItem('userName', value);
};

const clear = (): void => {
    localStorage.removeItem('userName');
};

const userNameStorage = {
    get,
    set,
    clear
};

export default userNameStorage;
