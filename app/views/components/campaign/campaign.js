/*
function createTodoItemView(content) {
    const liNode = document.createElement('li');
    // close button
    const span = document.createElement("span");
    span.className = 'close';
    const txt = document.createTextNode("\u00D7");
    span.appendChild(txt);

    liNode.textContent = content;
    liNode.appendChild(span);
    return liNode;
}

function updateView() {
    todolist.innerHTML = '';

    api.links.updateLinkList().then(data => {
        data.forEach(item => {
            const liNode = createTodoItemView(item.content);
            todolist.appendChild(liNode);
        })
    });
}
*/

// Links Button
addBtn.addEventListener('click', () => {
    todolist.innerHTML = 'test';
    // const dirtyInput = document.getElementById('myInput').value;
    api.links.addNewLink().then(data => {
        document.getElementById('myInput').value = 'changed';
        // updateView();
    });
});

// updateView();