/** @jsx createElement */
import { Children, Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";

const classes = addRules({
  table: {
    "border-spacing": 0,
    "border-collapse": "collapse",
    width: "100%",
    "& td, & th": {
      padding: [6, 8],
      "user-select": "none",
    },
    "& th": {
      "font-weight": 500,
    },
  },
});

type HorizontalAlign = "left" | "center" | "right";
type SortDirection = "asc" | "desc";

export interface Column<Key extends string> {
  align?: HorizontalAlign;
  hidden?: boolean;
  key: Key;
  label: string;
  sortable?: boolean;
}

interface TableProps<
  Row extends Record<string, any>,
  Key extends string,
  Value extends string | number | null
> {
  columns: Column<Key>[];
  getValue?(args: { row: Row; column: Column<Key> }): Promise<Value> | Value;
  renderCellContent?(args: {
    row: Row;
    column: Column<Key>;
    value: Value;
  }): Children;
  renderCell?(args: {
    row: Row;
    column: Column<Key>;
    children: Element;
  }): Promise<Element<"td">>;
  renderRow?(args: { row: Row; children: Children }): Element<"tr">;
  renderValue?(args: { row: Row; column: Column<Key>; value: Value }): Children;
  rows: Row[];
  sort?(args: { valueA: Value; valueB: Value }): number;
  sortBy?: Key;
  sortDirection?: SortDirection;
}

export async function* Table<
  Row extends Record<string, any>,
  Key extends string,
  Value extends string | number | null
>(
  this: Context<TableProps<Row, Key, Value>>,
  props: TableProps<Row, Key, Value>
): AsyncGenerator<Element> {
  let {
    columns,
    getValue,
    renderRow,
    renderValue,
    rows,
    sort,
    sortBy,
    sortDirection,
  } = props;

  for await ({
    columns,
    getValue,
    renderRow,
    renderValue,
    rows,
    sort,
    sortBy,
    sortDirection,
  } of this) {
    if (getValue === undefined) {
      getValue = ({ column, row }) => {
        return row[column.key];
      };
    }

    if (renderRow === undefined) {
      renderRow = ({ children, row }) => {
        return <tr key={row}>{children}</tr>;
      };
    }

    if (renderValue === undefined) {
      renderValue = ({ value }) => {
        return value;
      };
    }

    if (sort === undefined) {
      sort = ({ valueA, valueB }) => {
        if (typeof valueA === "number" && typeof valueB === "number") {
          return valueA - valueB;
        } else if (typeof valueA === "string" && typeof valueB === "string") {
          if (valueA < valueB) {
            return -1;
          } else if (valueA > valueB) {
            return 1;
          } else {
            return 0;
          }
        }
        return 0;
      };
    }

    const values = new Map<Row, Map<Column<Key>, Value>>();
    await Promise.all(
      rows.map(async (row) => {
        if (!values.has(row)) {
          values.set(row, new Map<Column<Key>, Value>());
        }
        const rowMap = values.get(row)!;
        await Promise.all(
          columns.map(async (column) => {
            rowMap.set(column, await getValue!({ row, column }));
          })
        );
      })
    );

    if (sortBy !== undefined) {
      const column = columns.find((column) => column.key === sortBy)!;
      rows.sort((rowA, rowB) => {
        const valueA = values.get(rowA)!.get(column)!;
        const valueB = values.get(rowB)!.get(column)!;
        return sort!({ valueA, valueB }) * (sortDirection === "desc" ? -1 : 1);
      });
    }

    yield (
      <table class={classes.table}>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th align="left" crank-key={column}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const children = columns.map(
              (column): Element<"td"> => {
                const value = values.get(row)!.get(column)!;
                return (
                  <td crank-key={column}>
                    {renderValue!({ row, column, value })}
                  </td>
                );
              }
            );
            return renderRow!({ children, row });
          })}
        </tbody>
      </table>
    );
  }
}
