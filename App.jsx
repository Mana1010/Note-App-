import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Beshy from "./Beshy";
import Header from "./Header";
import "tailwindcss/tailwind.css";
import { VscEditorLayout } from "react-icons/vsc";
import HomeNotes from "./NOTE APP FOLDER/HomeNotes";
import { createContext } from "react";
import Section from "./RouterProject/Section";
import Routers from "./RouterProject/Routers";
import Homes from "./RouterProject/Home";
import Notes from "./NOTE APP FOLDER/Notes";
export const AvatarContext = createContext;
function App() {
  return(
    <div>
      <HomeNotes/>
    </div>
  )
}

export default App;
