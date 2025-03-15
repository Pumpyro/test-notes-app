import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNote, deleteNote } from "../store/slices/notesSlice";
import { Trash2 } from "lucide-react";

const NotesList = () => {
  const { notes, selectedNoteId } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  return (
    <div className="w-64 bg-gray-100 p-4 h-screen overflow-y-auto">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`p-3 mb-2 rounded cursor-pointer relative group ${
            selectedNoteId === note.id
              ? "bg-blue-200"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => dispatch(selectNote(note.id))}
        >
          <h3 className="font-medium truncate">{note.title}</h3>
          <p className="text-sm text-gray-600 truncate">{note.content}</p>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteNote(note.id));
            }}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
