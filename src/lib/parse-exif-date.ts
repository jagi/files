export function parseExifDate(dateString: string) {
  if (typeof dateString !== "string") {
    return null;
  }

  const matches = dateString.match(
    /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
  );
  if (matches === null) {
    return null;
  }

  const dateParts = matches.slice(1, 7).map(Number);
  return new Date(
    Date.UTC(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2],
      dateParts[3],
      dateParts[4],
      dateParts[5],
      0
    )
  );
}
