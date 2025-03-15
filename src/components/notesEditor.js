import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNote } from "../store/slices/notesSlice";

export const NotesEditor = () => {
  const { notes, selectedNoteId } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (!selectedNote) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center text-gray-500">
        Нет выбранной заметки
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 flex flex-col h-screen">
      <input
        type="text"
        value={selectedNote.title}
        onChange={(e) =>
          dispatch(
            updateNote({
              id: selectedNote.id,
              title: e.target.value,
              content: selectedNote.content,
            })
          )
        }
        className="text-2xl font-bold mb-4 p-2 border-b focus:outline-none focus:border-blue-500"
        placeholder="Название заметки"
      />
      <textarea
        value={selectedNote.content}
        onChange={(e) =>
          dispatch(
            updateNote({
              id: selectedNote.id,
              title: selectedNote.title,
              content: e.target.value,
            })
          )
        }
        className="flex-1 p-2 resize-none focus:outline-none"
        placeholder="Начните писать..."
      />
    </div>
  );
};

export default NotesEditor;
