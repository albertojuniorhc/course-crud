async function get() {
    return fetch("/api/todos").then(async (res) => {
        const toDosFromAPI = JSON.parse(await res.text()).toDos;
        return toDosFromAPI;
    });
}

export const toDoController = {
    get,
};
