export function removeQuotes(str: string) {
  return str.replaceAll("'", "").replaceAll('"', "");
}
