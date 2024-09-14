import { createContext, useState, useContext, useEffect } from 'react';



const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser({ name, email });
  };

  const login = (email, password) => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser({ email: storedUser.email, name: storedUser.name });
      return true;


    } else {
      alert('Invalid email or password');
      setUser(null);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
