import { useEffect, useState } from "react";
import "./App.css";
import { title } from "process";


type Note = {

  id:number;
  title: string;
  content: string;

}

const App = () => {

  const [notes, setNotes] = useState<Note[]>([]);
   useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/notes"
        );

        const notes: Note[] =
          await response.json();

        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);
  

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", title);
    console.log("content: ", content);
  };
    return (
      <div className="app-container">
        <form className="note-form"
        onSubmit={(event) => handleSubmit(event)}
        >
          <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
          ></input>
           <textarea
           value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
          ></textarea>
  
          <button type="submit">Add Note</button>
        </form>
        <div className="notes-grid">
        {notes.map((note) => (
        <div className="note-item">
        <div className="notes-header">
        <button>x</button>
        </div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      </div>
     ))}
   </div>

      </div>
    );
  };
  
  export default App;