import requests
import json

# Define the API URL
url = "http://127.0.0.1:8000/api/translate/"

# Define the payload with English text
data = {"text": "My father is fine."}

# Send the POST request
response = requests.post(url, json=data)

# Check if the request was successful
if response.status_code == 200:
    # Print the translated text
    print("Translated Text:", response.json()["translated_text"])
else:
    print("Error:", response.status_code)
