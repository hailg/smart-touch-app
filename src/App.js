import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from '@asgardeo/auth-react'

import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { Navbar, Footer, Sidebar, ThemeSettings } from './components'
import { Main, Customers, Calendar, Editor, Groups } from './pages'
import './App.css'

import { useStateContext } from './contexts/ContextProvider'
import clsx from 'clsx'

const App = () => {
  const {
    signIn,
    signOut,
    getAccessToken,
    isAuthenticated,
    getBasicUserInfo,
    state
  } = useAuthContext()
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    user,
    setUser
  } = useStateContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [setCurrentColor, setCurrentMode])

  useEffect(() => {
    async function signInCheck() {
      setIsAuthLoading(true)
      await sleep(2000)
      const isSignedIn = await isAuthenticated()
      setSignedIn(isSignedIn)
      setIsAuthLoading(false)
      return isSignedIn
    }
    signInCheck().then((res) => {
      if (res) {
        getUser()
      } else {
        console.log('User has not signed in')
      }
    })
  }, [])

  async function getUser() {
    setIsLoading(true)
    const userResponse = await getBasicUserInfo()
    console.log(userResponse)
    setUser(userResponse)
    setIsLoading(false)
    // const accessToken = await getAccessToken()
    // console.log(accessToken)
  }

  const handleSignIn = async () => {
    signIn()
      .then(() => {
        setSignedIn(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  if (isAuthLoading) {
    return <div className="animate-spin h-5 w-5 text-white">.</div>
  }

  if (!signedIn) {
    return (
      <button
        className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white"
        onClick={handleSignIn}
      >
        Login
      </button>
    )
  }

  return (
    <div
      className={clsx(
        currentColor && `theme-${currentColor}`,
        currentMode && `theme-${currentMode}`
      )}
    >
      <BrowserRouter>
        <div className="flex relative">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar bg-neutralBg text-onNeutralBg">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 bg-neutralBg text-onNeutralBg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'bg-neutralBg text-onNeutralBg min-h-screen md:ml-72 w-full  '
                : 'bg-neutralBg text-onNeutralBg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static navbar w-full bg-neutralBg text-onNeutralBg">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Main />} />
                <Route path="/dashboard" element={<Main />} />

                {/* pages  */}
                <Route path="/customers" element={<Customers />} />
                <Route path="/groups" element={<Groups />} />

                {/* apps  */}
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
