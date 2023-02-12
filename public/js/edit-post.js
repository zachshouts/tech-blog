const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');
const titleValue = document.getElementById('edit-title');
const contentValue = document.getElementById('edit-content');
let postId;

async function saveData(e) {
    e.preventDefault();
    e.stopPropagation();
    postId = e.target.value;

    const body = {
        title: titleValue.value,
        content: contentValue.value
    };

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/api/dashboard');
    }
};


async function deleteData(e) {
    e.preventDefault();
    e.stopPropagation();

    postId = e.target.value;

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/api/dashboard');
    };
};



saveBtn.addEventListener('click', saveData);
deleteBtn.addEventListener('click', deleteData);