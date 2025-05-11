import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";
import { useAuth } from "../context/ContextProvider";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [filterNotes, sestFilterNotes] = useState([]);
  const [query, setQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  useEffect(() => {
    sestFilterNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
        console.log("Fetched notes:", data.notes); 
      setNotes(data.notes);
    } catch (error) {
     console.error('Error fetching notes:', error);
    }
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description }, // request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error, "error connecting with axios in notemodel");
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description }, // request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error, "error connecting with axios in notemodel");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        // request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        toast.success("note deleted");
      }
    } catch (error) {
      console.log(error, "error connecting with axios in notemodel");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <Navbar setQuery={setQuery} />

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filterNotes.length > 0 ? (
          filterNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No Notes</p>
        )}
      </div>

      <button
        onClick={() => setModelOpen(true)}
        className="fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-4 rounded-full "
      >
        +
      </button>
      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
