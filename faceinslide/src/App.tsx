import React from "react"
import "./App.css"
import { MainPage } from "./components/pages/MainPage"
import { ThemeProvider } from "@material-ui/core"
import { theme } from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  )
}

export default App
