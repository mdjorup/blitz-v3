import React from 'react';
import { IconContext } from 'react-icons';

//type primary: light blue button that is where we want the user to click
//type secondary: Important button, but complements a primary button
//type tertiary: just a text button for non-target components


function Button({text, icon, type, onClick}) {
  return (
    <div>
      {type==='primary' && <button 
        className={`flex items-center space-x-1.5 text-slate-200 font-bold bg-blue-500 p-2.5 rounded-lg hover:bg-blue-600`} 
        onClick={onClick}>
          {icon && <IconContext.Provider value={{color: '#EEEEEE', size: '1.25em'}}>
            {icon}
          </IconContext.Provider>}
          <div>{text}</div>
      </button>}
      {type==='secondary'&&<button 
        className={`text-blue-50 bg-transparent p-2.5 rounded-lg border border-blue-50 hover:text-blue-400 hover:border-blue-400`} 
        onClick={onClick}>
          {icon && <IconContext.Provider value={{color: '#EEEEEE', size: '1.25em'}}>
            {icon}
          </IconContext.Provider>}
          <div>{text}</div>
      </button>}
      {type==='tertiary'&&<button 
        className={`text-blue-50 bg-transparent p-2.5 hover:text-blue-400 hover:border-b hover:border-blue-400`} 
        onClick={onClick}>
          {icon && <IconContext.Provider value={{color: '#EEEEEE', size: '1.25em'}}>
            {icon}
          </IconContext.Provider>}
          <div>{text}</div>
      </button>}
    </div>
    
  );
}

export default Button;
