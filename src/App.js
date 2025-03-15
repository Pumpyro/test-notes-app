import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NotesList from "./components/notesList";
import NoteEditor from "./components/notesEditor";
import { useDispatch } from "react-redux";
import { addNote } from "./store/slices/notesSlice";

const NotesApp = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen bg-white">
      <div className="flex flex-col">
        <div className="p-4 bg-gray-200">
          <button
            onClick={() => dispatch(addNote())}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Создать новую заметку
          </button>
        </div>
        <NotesList />
      </div>
      <NoteEditor />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <NotesApp />
    </Provider>
  );
}

export default App;
