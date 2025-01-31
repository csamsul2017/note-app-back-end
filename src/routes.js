const { addNoteHandler, getAllNotesHandler, getNoteHandler, getNoteUpdate, getDeleteNote } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: getNoteUpdate,
    }
    ,
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: getDeleteNote,
    }
]


module.exports = routes;