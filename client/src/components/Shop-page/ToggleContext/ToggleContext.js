import React, { useContext, useState } from 'react';

const ToggleContext = React.createContext();
const UpdateToggleContext = React.createContext();

export const useToggle = () => useContext(ToggleContext);
export const useToggleUpdate = () => useContext(UpdateToggleContext);

export const ToggleProvider = ({ children }) => {
  const [toggleFilter, setToggleFilter] = useState(false);

  const UpdateToggle = () => {
      console.log('clicked')
    setToggleFilter(!toggleFilter);
  };

  return (
    <ToggleContext.Provider value={toggleFilter}>
      <UpdateToggleContext.Provider value={UpdateToggle}>
        {children}
      </UpdateToggleContext.Provider>
    </ToggleContext.Provider>
  );
};
