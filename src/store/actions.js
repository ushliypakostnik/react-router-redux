export const pageToActive = (page, height) => ({
  type: "PAGE_TO_ACTIVE",
  activePage: page,
  minHeight: height
});

export const toogleTheme = (theme) => ({
  type: "TOGGLE_THEME",
  theme: theme
});
