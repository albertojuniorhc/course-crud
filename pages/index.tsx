import React, { useEffect } from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { toDoController } from "@ui/controller/todos";
import { texts } from "@ui/constants";

interface THomeToDo {
    content: string;
    id: string;
    date: Date;
}

export default function Page() {
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [toDoList, setToDoList] = React.useState<THomeToDo[]>([]);

    useEffect(() => {
        toDoController.get({ page }).then(({ toDos, pages }) => {
            setToDoList((oldToDoList) => {
                return [...oldToDoList, ...toDos];
            });
            setTotalPages(pages);
        });
    }, [page]);

    const hasMorePages = page < totalPages;

    return (
        <main>
            <GlobalStyles themeName="coolGrey" />
            <header>
                <div className="typewriter">
                    <h1>What do you need/want to do?</h1>
                </div>
                <form>
                    <input type="text" placeholder="Run, Study..." />
                    <button type="submit" aria-label="Add new item">
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filter current list, ex: Dentist"
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">ID</th>
                            <th align="left">Content</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {toDoList.map((toDo) => {
                            return (
                                <tr key={toDo.id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{toDo.id.substring(0, 6)}</td>
                                    <td>{toDo.content}</td>
                                    <td align="right">
                                        <button data-type="delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                Loading...
                            </td>
                        </tr> */}

                        {/* <tr>
                            <td colSpan={4} align="center">
                                No items found
                            </td>
                        </tr> */}

                        {hasMorePages && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    <button
                                        data-type="load-more"
                                        onClick={() => setPage(page + 1)}
                                    >
                                        {`${texts.loadMore} `}
                                        <span
                                            style={{
                                                display: "inline-block",
                                                marginLeft: "4px",
                                                fontSize: "1.2em",
                                            }}
                                        >
                                            ↓
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
