const Datastore = require('electron-store');
// const todoItemSchema = require('../schemas/todoItem');

const todoItemSchema = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        isDone: {
            type: 'boolean',
            default: false
        }
    },
};

const store = new Datastore({todoItemSchema});


module.exports = new TodoItemStore();
