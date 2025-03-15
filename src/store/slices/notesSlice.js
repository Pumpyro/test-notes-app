import { createSlice } from "@reduxjs/toolkit";

const defaultNote = {
  id: "1",
  title: "Добро пожаловать в заметки!",
  content: "Это твоя первая заметка..",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const loadInitialState = () => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    return JSON.parse(savedNotes);
  }
  return {
    notes: [defaultNote],
    selectedNoteId: defaultNote.id,
  };
};

const initialState = loadInitialState();

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state) => {
      const newNote = {
        id: Date.now().toString(),
        title: "Новая заметка",
        content: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      state.notes.push(newNote);
      state.selectedNoteId = newNote.id;
      localStorage.setItem("notes", JSON.stringify(state));
    },
    updateNote: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.title = action.payload.title;
        note.content = action.payload.content;
        note.updatedAt = Date.now();
        localStorage.setItem("notes", JSON.stringify(state));
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = state.notes[0]?.id || null;
      }
      localStorage.setItem("notes", JSON.stringify(state));
    },
    selectNote: (state, action) => {
      state.selectedNoteId = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, selectNote } =
  notesSlice.actions;
export default notesSlice.reducer;
