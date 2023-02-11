const addButton = document.getElementById('addButton');
const responseText = document.getElementById('response');
const modalResponse = document.getElementById('modalResponse');
let postId;

async function addResponse(e) {
    postId = e.target.value;
    const body = {
        comment_text: responseText.value,
    };

    const commentResponse = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (commentResponse.ok) {
        modalResponse.textContent = "Success";
        location.reload();
    } else {
        modalResponse.textContent = "There was an error processing your comment.";
    };

};

addButton.addEventListener('click', addResponse);