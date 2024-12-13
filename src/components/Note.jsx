import React, { forwardRef } from 'react';

const Note = forwardRef(({ note, onMouseDownHandler }, ref) => {
    return (
        <div
            style={{
                top: `${note.y}px`,
                left: `${note.x}px`,
            }}
            className="absolute w-[250px] py-10 px-5 bg-yellow-200 border border-black cursor-move select-none"
            ref={ref}
            onMouseDown={(e) => onMouseDownHandler(note.id, e)}
        >
            {note.text}
        </div>
    );
});

export default Note;
