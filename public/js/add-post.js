const saveBtn = document.getElementById('saveBtn');
const newPostTitle = document.getElementById('newPostTitle');
const newPostContent = document.getElementById('newPostContent');


async function addPost() {
    const body = {
        title: newPostTitle.value,
        content: newPostContent.value
    };

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/api/dashboard');
    };
};



saveBtn.addEventListener('click', addPost);