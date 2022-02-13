export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.log("Error when getting item from local storage", e)
    return null;
  }
}

export  const setItem = (key, data) => {
  try {
    return JSON.stringify(localStorage.setItem(key, data));
  } catch (e) {
    console.log("Error when setting item in local storage:" + e)
  }
}
