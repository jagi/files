/** @jsx createElement */
import { Context, createElement, Element, Fragment } from "@bikeshaving/crank";
import { formatDateTime } from "../lib/format-date-time";
import { formatSize } from "../lib/format-size";
import { getFileLastModified } from "../lib/get-file-last-modified";
import { getFileSize } from "../lib/get-file-size";
import { getFileType } from "../lib/get-file-type";
import { FileRow } from "./file-row";
import { NoFiles } from "./no-files";
import { Table } from "./table";

export function Files(this: Context): Element {
  const files = this.consume("files");
  const selectedFiles = this.consume("selectedFiles");

  if (files.length === 0) {
    return <NoFiles />;
  }

  return (
    <Table
      columns={[
        {
          key: "name",
          label: "Name",
        },
        {
          key: "modified",
          label: "Modified",
        },
        {
          key: "size",
          label: "Size",
        },
        {
          key: "type",
          label: "Type",
        },
      ]}
      getValue={async ({ column, row }) => {
        switch (column.key) {
          case "name": {
            return row.name;
          }
          case "modified": {
            return getFileLastModified(row);
          }
          case "size": {
            return getFileSize(row);
          }
          case "type": {
            return getFileType(row);
          }
        }
      }}
      renderRow={({ children, row }) => {
        return (
          <FileRow fileOrDirectory={row} selected={selectedFiles.includes(row)}>
            {children}
          </FileRow>
        );
      }}
      renderValue={({ column, value }) => {
        switch (column.key) {
          case "modified": {
            return typeof value === "number"
              ? formatDateTime(new Date(value as number))
              : "-";
          }
          case "size": {
            return typeof value === "number"
              ? formatSize(value as number)
              : "-";
          }
          default: {
            return value;
          }
        }
      }}
      rows={files}
      sortBy="size"
      sortDirection="asc"
    />
  );
}
