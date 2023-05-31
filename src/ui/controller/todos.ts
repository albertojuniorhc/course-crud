import { toDoRepository } from "@ui/repository/todos";

interface ToDoControllerGetParams {
    page: number;
}

async function get({ page }: ToDoControllerGetParams) {
    return toDoRepository.get({
        page,
        pageSize: 3,
    });
}

export const toDoController = {
    get,
};
