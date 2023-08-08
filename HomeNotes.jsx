import React from "react";
import { nanoid } from "nanoid";
import noted from "./noted.png";
import { useState, useEffect, useRef } from "react";
import Notes from "./Notes";
import { onSnapshot } from "firebase/firestore"
import { notesCollection } from "./firebase/firebase";
function HomeNotes() {
  const [searchbox, isSearching] = useState("");
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const inputRef = useRef(null);
  function focusActivate() {
    inputRef.current.focus();
  }
  async function createnoted() {
    let createnotes = {
      title: "",
      description: "",
      id: nanoid(),
      time: new Date(),
      customize: {
        color: "white",
        underline: false,
        fontWeight: false,
        italic: false,
        isLock: false,
      }
    };
    setNotes([createnotes, ...notes]);
  }
  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])
  function deleteAll(){
    setNotes([]);
  }
  return (
    <div className="bg-slate-700 w-screen h-screen">
      <header className="w-full fixed top-0 left-0 right-0 px-4 py-4 flex items-center justify-between bg-slate-900">
        <div className="flex gap-2 items-center">
          <img src={noted} className="w-7" />
          <h1 className="text-white text-3xl font-quicksand font-semibold">
            Noted
          </h1>
        </div>
        <div
          className="w-2/5 bg-white p-1.5 rounded-md focus:border border-red-500 flex justify-between cursor-text"
          onClick={focusActivate}
        >
          <input
            type="text"
            placeholder="Search your Notes"
            className="w-11/12 border-none outline-none font-poppins mr-2"
            ref={inputRef}
            onChange={(e) => isSearching(e.target.value)}
            value={searchbox}
          />
          <button
            className="text-2xl hover:text-red-500"
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 rounded-md font-poppins h-10 px-3 text-white cursor-pointer flex items-center justify-between overflow-hidden"
            onClick={createnoted}
          >
            <span className="h-full flex items-center text-base">
              Add Notes
            </span>
            <span className="h-full flex items-center text-md mb-1 pl-3 text-2xl">
              <ion-icon name="add-outline"></ion-icon>
            </span>
          </button>
          <button className="bg-red-600 rounded-md font-poppins h-10 px-3 text-white cursor-pointer flex items-center justify-between overflow-hidden" onClick={deleteAll}>
            <span className="h-full flex items-center text-base">
              Delete All Notes
            </span>
            <span className="h-full flex items-center text-md mb-1 pl-3 text-2xl">
              <ion-icon name="trash-outline"></ion-icon>
            </span>
          </button>
          <button className="bg-orange-600 rounded-md font-poppins h-10 px-3 text-white cursor-pointer flex items-center justify-between overflow-hidden">
            <span className="h-full flex items-center text-base">About Us</span>
            <span className="h-full flex items-center text-md mb-1 pl-3 text-2xl">
              <ion-icon name="people-outline"></ion-icon>
            </span>
          </button>
        </div>
      </header>
      <main className="h-full w-full flex items-center px-3 justify-center">
     <div className="w-full grid grid-cols-5 h-5/6 mt-14 overflow-y-auto gap-4 overflow-hidden relative">
          {notes.length > 0 ? (
            notes.map((notelist) => (
              <Notes
                key={notelist.id}
                note={notelist}
                createNotes={setNotes}
              />
            ))
          ) : (
            <div className="place-content-center grid mx-auto absolute top-1/2 left-[35%]">
            <h1 className="text-cyan-600 font-bold font-poppins text-5xl">
              You have no Notes
            </h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomeNotes;
