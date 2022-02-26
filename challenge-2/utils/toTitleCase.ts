export const toTitleCase = (phrase: string) => {
  if (phrase) {
    return phrase
      .toLocaleLowerCase("TR")
      .split(" ")
      .map((word) => word.charAt(0).toLocaleUpperCase("TR") + word.slice(1))
      .join(" ");
  }
  return "";
};
