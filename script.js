document.getElementById('generate').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt');
    const outputDiv = document.getElementById('output');

    const prompt = promptInput.value.trim();

    if (!prompt) {
        outputDiv.innerHTML = `<p class="text-red-500">Please enter a prompt!</p>`;
        return;
    }

    outputDiv.innerHTML = `<p class="text-blue-500">Generating...</p>`;

    try {
        const response = await fetch('http://localhost:5000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the generated content.');
        }

        const data = await response.json();

        if (data.imageUrl || data.videoUrl) {
            outputDiv.innerHTML = data.imageUrl
                ? `<img src="${data.imageUrl}" alt="Generated Image" class="rounded-lg shadow-md" />`
                : `<video controls class="rounded-lg shadow-md">
                     <source src="${data.videoUrl}" type="video/mp4">
                     Your browser does not support the video tag.
                   </video>`;
        } else {
            outputDiv.innerHTML = `<p class="text-red-500">Failed to generate image/video.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        outputDiv.innerHTML = `<p class="text-red-500">An error occurred. Please try again.</p>`;
    }
});
