document.querySelector('#comment-button').addEventListener('click', () => {
    document.querySelector('#comment-form').showModal();
});

async function createComment(event) {
    event.preventDefault();

    const content = document.querySelector('#content').value.trim();
    const post_id = document.querySelector('#post_id').value;

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to create project');
        }
    }
}

document.querySelector('form').addEventListener('submit', createComment);
