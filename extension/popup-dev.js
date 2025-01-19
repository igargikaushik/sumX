//for local development
document.addEventListener('DOMContentLoaded', () => {
    const summarizeBtn = document.getElementById('summarizeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const inputText = document.getElementById('inputText');
    const summaryOutput = document.getElementById('summary');
    const citationOutput = document.getElementById('citation');
    const loadingSpinner = document.createElement('div'); 
    
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.style.display = 'none'; // initially hidden
    document.body.appendChild(loadingSpinner); 

    summarizeBtn.addEventListener('click', async () => { 
        const text = inputText.value.trim();
        if (text.split(/\s+/).length < 30) {
            summaryOutput.textContent = 'Not enough data to summarize. Please provide more text.';
            return;
        }

        if (!text) {
            alert('Enter some text to summarize.');
            return;
        }
        citationOutput.textContent = '';//clr previous citation

        loadingSpinner.style.display = 'block';
        summarizeBtn.disabled = true;
        summarizeBtn.textContent = 'Summarizing...';

        try {
            const response = await fetch('http://127.0.0.1:5000/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const data = await response.json();
                summaryOutput.textContent = data.summary  || "No summary available.";
            } else {
                summaryOutput.textContent = 'Error summarizing text. Please try again later.';
            }
        } catch (error) {
            summaryOutput.textContent = 'Error connecting to the backend.';
        } finally {
            loadingSpinner.style.display = 'none';
            summarizeBtn.disabled = false;
            summarizeBtn.textContent = 'Summarize';
        }
    });

// =========clr button
    clearBtn.addEventListener('click', () => {
        inputText.value = '';  
        summaryOutput.textContent = '';  
        citationOutput.textContent = '';  

    }); 


  //=========citation
    const generateCitationBtn = document.getElementById('generateCitation');
    generateCitationBtn.addEventListener('click', async () => {
        const summaryText = summaryOutput.textContent.trim();

        if (!summaryText) {
            alert('Please summarize the text first.');
            return;
        }

        citationOutput.textContent = 'Generating citation...';

        try {
            const citationResponse = await fetch('http://localhost:5000/generate-citation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ summary: summaryText }),
            });

            if (citationResponse.ok) {
                const citationData = await citationResponse.json();
                citationOutput.textContent = citationData.citation;
            } else {
                citationOutput.textContent = 'Error generating citation.';
            }
        } catch (error) {
            citationOutput.textContent = 'Not appropriate data to generate "author" or "year" for this article';
        }
    });
});
