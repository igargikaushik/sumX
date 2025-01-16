from flask import Flask, request, jsonify
import os
import requests
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

app = Flask(__name__)
CORS(app) 
#========homeroute
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the summarization API. Use the /summarize endpoint to summarize text."})

#=========summarization endpoint
@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    text = data.get("text", "")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        response = requests.post(
            API_URL,
            headers=headers,
            json={"inputs": text},
        )
        response.raise_for_status()
        summary = response.json()[0]['summary_text']
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/generate-citation', methods=['POST'])
def generate_citation():
    data = request.json
    summary = data.get("summary", "")
    
    if not summary:
        return jsonify({"error": "No summary provided"}), 400

    try:
        citation_info = generate_citation_from_summary(summary)

        title = citation_info.get("title", "No title found")

        author = citation_info.get("author", "Not enough or appropriate data for author")
        year = citation_info.get("year", "Not enough or appropriate data for year")

        formatted_citation = f'"{title}". {author}, {year}.'

        return jsonify({"citation": formatted_citation})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generate_citation_from_summary(summary):
    title = " ".join(summary.split()[:3])  


    citation_info = {
        "author": "Not enough or appropriate data for author", 
        "title": title, 
        "year": "or year"  
    }
    return citation_info
    

if __name__ == "__main__":
    app.run(debug=True)


