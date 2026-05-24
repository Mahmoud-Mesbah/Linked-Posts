export const safeGetJSON = (key) => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
  
      return JSON.parse(value);
    } catch (err) {
      localStorage.removeItem(key); 
      return null;
    }
  };
  
  export const safeSetJSON = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };