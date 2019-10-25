const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

const get = key => {
  try {
    const items = localStorage.getItem(key);

    return items ? JSON.parse(items) : null; 
  } catch (e) {
    console.log('err');
  }

  return null;
};
export default {
  save,
  get,
};