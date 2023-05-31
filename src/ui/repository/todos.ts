interface ToDo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}
interface ToDoRepositoryGetParams {
    page: number;
    pageSize: number;
}

interface ToDoRepositoryGetOutput {
    toDos: ToDo[];
    pages: number;
    total: number;
}

function get({
    page,
    pageSize,
}: ToDoRepositoryGetParams): Promise<ToDoRepositoryGetOutput> {
    return fetch("/api/todos").then(async (res) => {
        const toDosFromAPI = parseToDosFromServer(
            JSON.parse(await res.text())
        ).toDos;

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedToDos = toDosFromAPI.slice(startIndex, endIndex);
        const totalPages = Math.ceil(toDosFromAPI.length / pageSize);

        return {
            toDos: paginatedToDos,
            pages: totalPages,
            total: toDosFromAPI.length,
        };
    });
}

export const toDoRepository = { get };

function parseToDosFromServer(responseBody: unknown): { toDos: Array<ToDo> } {
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "toDos" in responseBody &&
        Array.isArray(responseBody.toDos)
    ) {
        return {
            toDos: responseBody.toDos.map((toDo: unknown) => {
                if (toDo === null && typeof toDo !== "object") {
                    throw new Error("Invalid ToDo from API");
                }

                const { id, done, date, content } = toDo as {
                    id: string;
                    done: string;
                    date: string;
                    content: string;
                };

                return {
                    id,
                    content,
                    done: String(done).toLowerCase() === "true",
                    date: new Date(date),
                };
            }),
        };
    }

    return {
        toDos: [],
    };
}
