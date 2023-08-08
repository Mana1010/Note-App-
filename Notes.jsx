import React from "react";
import { useState, useEffect } from "react";
import { FaBold, FaItalic, FaEraser, FaUnderline } from "react-icons/fa";

function Notes({ note, createNotes }) {
  const colorList = [
    "#16A34A",
    "#0284C7",
    "#E11D48",
    "#EA580C",
    "#EAB308",
    "#525252",
    "#F87171",
    "#0891B2",
    "#9333EA",
    "white",
    "#65A30D",
    "#92400E",
    "#ec4899",
    "#a16207",
  ];
  function handleTitleChange(e) {
    const updatedNote = { ...note, title: e.target.value };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
    );
  }
  function handleDescriptionChange(e) {
    const updatedNote = { ...note, description: e.target.value };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
    );
    createNotes((currentNotes) => {
      let newArray = [];
      for (let i = 0; i < currentNotes.length; i++) {
        if (currentNotes[i].id === note.id) {
          newArray.unshift({ ...currentNotes[i], description: e.target.value });
        } else {
          newArray.push(currentNotes[i]);
        }
      }
      return newArray;
    });
  }
  function handleEraseChange() {
    const updatedNote = { ...note, description: "" };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
    );
  }
  function underline() {
    const updateCustomization = {
      ...note,
      customize: { ...note.customize, underline: !note.customize.underline },
    };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updateCustomization : n))
    );
  }
  function fontWeight() {
    const updateCustomization = {
      ...note,
      customize: { ...note.customize, fontWeight: !note.customize.fontWeight },
    };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updateCustomization : n))
    );
  }
  function italic() {
    const updateCustomization = {
      ...note,
      customize: { ...note.customize, italic: !note.customize.italic },
    };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updateCustomization : n))
    );
  }
  function isLock() {
    const updateCustomization = {
      ...note,
      customize: { ...note.customize, isLock: !note.customize.isLock },
    };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updateCustomization : n))
    );
  }
  function color(colors) {
    const updateCustomization = {
      ...note,
      customize: { ...note.customize, color: colors },
    };
    createNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updateCustomization : n))
    );
  }
  function deleteNotes() {
    createNotes((nota) => nota.filter((notes) => note.id !== notes.id));
  }
  return (
    <div className="bg-white h-96 border-none outline-none rounded-lg p-2">
      <header className="flex item-center border-b-4 h-12">
        <input
          type="text"
          placeholder="#Your Title"
          className="w-full h-full outline-none border-none font-semibold font-poppins"
          onChange={handleTitleChange}
          value={note.title}
        />
        <button className="text-lg text-emerald-800" onClick={isLock}>
          {note?.customize?.isLock ? (
            <ion-icon name="lock-closed"></ion-icon>
          ) : (
            <ion-icon name="lock-open"></ion-icon>
          )}
        </button>
        <button className="text-lg text-red-700" onClick={deleteNotes}>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </header>
      <div className="h-3/4 border-none py-2 px-1 w-full overflow-y-auto outline-none">
        <textarea
          type="text"
          className="h-[85%] border w-full outline-none font-poppins resize-none shadow-lg p-2.5 disabled:contrast-50 hyphens-manual"
          style={{
            backgroundColor: note?.customize?.color,
            textDecoration: note?.customize?.underline ? "underline" : "none",
            fontStyle: note?.customize?.italic ? "italic" : "normal",
            fontWeight: note?.customize?.fontWeight ? "700" : "500",
          }}
          onChange={handleDescriptionChange}
          value={note.description}
          disabled={note?.customize?.isLock}
        />
      </div>
      <footer className="flex w-full h-10">
        <div className="1/4 flex flex-wrap gap-1 h-full">
          {colorList.map((colorlist, index) => (
            <div
              className="rounded-full p-2.5 cursor-pointer border-2"
              style={{ backgroundColor: colorlist }}
              key={index}
              onClick={() => color(colorList[index])}
            ></div>
          ))}
        </div>
        <div className="flex pl-1 w-3/5 gap-1">
          <button
            className="text-slate-600 text-sm"
            onClick={underline}
            style={{ color: note.customize?.underline ? "crimson" : null }}
          >
            <FaUnderline />
          </button>
          <button
            className="text-slate-600 text-sm"
            onClick={fontWeight}
            style={{ color: note.customize?.fontWeight ? "crimson" : null }}
          >
            {<FaBold />}
          </button>
          <button
            className="text-slate-600 text-sm"
            onClick={italic}
            style={{ color: note.customize?.italic ? "crimson" : null }}
          >
            {<FaItalic />}
          </button>
          <button
            className="text-slate-600 text-sm active:text-red-500"
            onClick={handleEraseChange}
          >
            {<FaEraser />}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Notes;
