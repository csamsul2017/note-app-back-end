const {nanoid} = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
  const {title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if(isSuccess) {
    const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
            noteId: id,
        },
    })
    return response.code(200);
  }

  const response = h.response({
    status: 'Fail',
    message: 'Note no success'
  })

  response.code(500)
  return response;
}

const getAllNotesHandler = () => (
  {
    status: 'success',
    data: {
      notes
    }
  }
)

const getNoteHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.find((note) => note.id === id)

  if(!note){
    return h.response({
      status: 'Fail',
      message: 'Note no success'
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {note},
  }).code(200);
}

const getNoteUpdate = (request, h) => {
  const {id} = request.params;
  const {title, tags, body} = request.payload
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id)

  if(index === -1) {
    return h.response({
      status: 'Fail',
      message: 'Update filed'
    }).code(404);
  }

  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt,
  }

  return h.response({
    status: 'success',
    message: 'Catatan berhasil diperbaharui',
    data: notes[index],
  }).code(200);
}

const getDeleteNote = (request, h) => {
  const { id } = request.params
  const index = notes.findIndex((n) => n.id === id)
  
  if(index === -1){
    return h.response({
      status: 'Fail',
      message: 'delete filed'
    }).code(404);
  }
  
  notes.splice(index,1)

  return h.response({
    status: 'success',
    message: 'delete success',
  }).code(200);

}


module.exports = { addNoteHandler, getAllNotesHandler, getNoteHandler, getNoteUpdate, getDeleteNote}