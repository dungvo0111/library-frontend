import React from 'react'

export const themes = {
  primary: {
    color: 'Blue',
    code: '#3f51b5',
  },
  secondary: {
    color: 'Crimson',
    code: '#DC143C',
  },
  third: {
    color: 'Gold',
    code: '#B8860B',
  },
}

export default React.createContext({
  theme: themes.primary,
  switchTheme: (code: string) => {},
})
