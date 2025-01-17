 ### Use as your extension
1. **Clone the Repository**

2. **Set Up a Virtual Environment**
Create a virtual environment 

bash-
Copy code
python -m venv venv
Activate the environment:

(On Windows)
  bash-
  Copy code
  venv\Scripts\activate
(On Linux/Mac)
  bash
  Copy code
  source venv/bin/activate
 
3.**Install Dependencies**

bash-
Copy code
pip install -r requirements.txt

4. **Configure the Hugging Face API Key**
The backend relies on Hugging Face's Inference API for text summarization.

Create a .env file  and add your API key:
env
HUGGINGFACE_API_KEY=your_huggingface_api_key

5. **Start the Backend Server**
Run the Flask app

bash
Copy code
python app.py
the backend server will run at http://127.0.0.1:5000.

 ### Using with the Chrome Extension
1. **Clone the Frontend Repository**

Find the API URL used in fetch calls.
Replace it with your local backend URL (http://127.0.0.1:5000).
Example in popup.js:

javascript
Copy code
const response = await fetch('http://127.0.0.1:5000/summarize', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
});

3. Add the Extension to Chrome
Open Chrome and navigate to chrome://extensions/.
Enable "Developer mode" 
"Load unpacked" and select the folder containing the manifest.json file from the frontend repository.
The SumX extension should now appear in your browser toolbar.

**u can now use the Extension**

Endpoints Overview
1. Home Endpoint
GET /

2. Summarize Text
POST /summarize

Payload:
json
Copy code
{
  "text": "Your text here"
}
Response:
json
Copy code
{
  "summary": "Generated summary here"
}
3. Generate Citation
POST /generate-citation

Payload:
json
Copy code
{
  "summary": "Your summary here"
}
Response:
json
Copy code
{
  "citation": "Generated citation here"
}

License:
This project is licensed under the MIT License. See the LICENSE file for details.
