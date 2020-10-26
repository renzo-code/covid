export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('eco-place');
    if (serializedState === null || serializedState === undefined) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  if (state.auth) {
    state.auth.auth.error = null;
  }

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('eco-place', serializedState);
  } catch (err) {
    // ignore write error
  }
};
