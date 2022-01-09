import React, { useState, useEffect } from 'react'
import { ImBrightnessContrast } from 'react-icons/im'

const DARK_CLASS = 'dark'

export const DarkToggle = () => {
  //Optional but commented out for now: useMediaQuery to check user device preference
  /* const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)"
        },
        undefined,
        prefersDark => {
            setIsDark(prefersDark);
        }
    ); */

  const [isDark, setIsDark] = useState(
    localStorage.getItem('color-scheme') === 'dark' ? true : false
  )

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS)
      document.querySelectorAll('.theme').forEach(el => {
        el.classList.add(DARK_CLASS)
      })
      localStorage.setItem('color-scheme', 'dark')
    } else {
      document.documentElement.classList.remove(DARK_CLASS)
      document.querySelectorAll('.theme').forEach(el => {
        el.classList.remove(DARK_CLASS)
      })
      localStorage.setItem('color-scheme', 'light')
    }
  }, [isDark])

  function changeMode() {
    setIsDark(prevValue => !prevValue)
  }

  return (
    <>
      <button
        id="darkToggleBtn"
        className="circle theme flex"
        onClick={() => {
          changeMode()
        }}
      >
        <ImBrightnessContrast size={18} />
      </button>
    </>
  )
}
