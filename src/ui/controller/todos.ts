import { toDoRepository } from "@ui/repository/todos";

interface ToDoControllerGetParams {
    page?: number;
}

async function get({ page }: ToDoControllerGetParams = {}) {
    return toDoRepository.get({
        page: page || 1,
        pageSize: 5,
    });
}

export const toDoController = {
    get,
};
