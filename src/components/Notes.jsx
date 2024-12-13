import React, { useRef, useState } from 'react'
import Note from './Note';

const Notes = () => {

    const [notes, setNotes] = useState([
        {
            id: 1,
            text: "Hii",
            x: 200,
            y: 10,
        },
        {
            id: 2,
            text: "Yoo",
            x: 500,
            y: 10,
        }
    ]);

    const selectedNoteId = useRef(null);

    const noteRefs = useRef({});

    const updateNotePosition = (noteId, newX, newY) => {
        if (!noteId) return;

        setNotes((prev) => {
            return prev.map((note) => {
                if (note.id == noteId) {
                    return { ...note, x: newX, y: newY }
                }
                else {
                    return note;
                }
            })
        })
    }

    const isOverLapping = (a, b) => {
        if (!a || !b || a === b) return false;

        const A = noteRefs.current[a].getBoundingClientRect();
        const B = noteRefs.current[b].getBoundingClientRect();

        if (B.left < A.right && B.right > A.left && B.top < A.bottom && B.bottom > A.top) {
            return true;
        }

        return false;
    }

    const onMouseMoveHandler = (e) => {
        if (!selectedNoteId.current) return;
        const x = e.clientX;
        const y = e.clientY;
        const dx = selectedNoteId.current.dx;
        const dy = selectedNoteId.current.dy;

        const note = noteRefs.current[selectedNoteId.current.noteId];

        note.style.left = `${x - dx}px`;
        note.style.top = `${y - dy}px`;
    }

    const onMouseUpHandler = (e) => {

        const noteId = selectedNoteId.current.noteId;
        if (!noteId) return;

        let overlap = false;

        notes.forEach((note) => {
            if (isOverLapping(note.id, noteId)) {
                overlap = true;
            }
        })

        const note = noteRefs.current[noteId];
        const rect = note.getBoundingClientRect();
        const newX = overlap ? selectedNoteId.current.initialX : rect.x;
        const newY = overlap ? selectedNoteId.current.initialY : rect.y;

        note.style.left = `${newX}px`;
        note.style.top = `${newY}px`;

        updateNotePosition(noteId, newX, newY);

        selectedNoteId.current = null;
        window.removeEventListener("mousemove", onMouseMoveHandler);
        window.removeEventListener("mouseup", onMouseUpHandler);
    }

    const onMouseDownHandler = (noteId, e) => {
        const note = noteRefs.current[noteId];
        const rect = note.getBoundingClientRect();

        selectedNoteId.current = {
            noteId,
            dx: e.clientX - rect.x,
            dy: e.clientY - rect.y,
            initialX: rect.x,
            initialY: rect.y
        };

        window.addEventListener("mousemove", onMouseMoveHandler);
        window.addEventListener("mouseup", onMouseUpHandler);
    }

    const attachRef = (noteId, element) => {
        if (!noteRefs.current[noteId] && element) {
            noteRefs.current[noteId] = element;
        }
        return noteRefs.current[noteId];
    };

    return (
        <>
            {
                notes.map((note) => {
                    return (
                        <Note
                            key={note.id}
                            ref={(el) => attachRef(note.id, el)}
                            note={note}
                            onMouseDownHandler={onMouseDownHandler}
                        />
                    )
                })
            }
        </>
    )
}

export default Notes