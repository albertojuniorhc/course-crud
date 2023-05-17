import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";

export default function Page() {
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
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>d4f26</td>
                            <td>ToDo content</td>
                            <td align="right">
                                <button data-type="delete">Delete</button>
                            </td>
                        </tr>

                        <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                Loading...
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={4} align="center">
                                No items found
                            </td>
                        </tr>

                        <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                <button data-type="load-more">
                                    Load more{" "}
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
                    </tbody>
                </table>
            </section>
        </main>
    );
}
