# translate/views.py

from django.http import JsonResponse
from rest_framework.decorators import api_view
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

# Load the model and tokenizer
model_dir = "finetuned_en_hi_model_auto"  # path to your model directory
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForSeq2SeqLM.from_pretrained(model_dir)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)


# Function to translate English to Hindi
def translate_to_hindi(english_text):
    inputs = tokenizer(english_text, return_tensors="pt", padding=True, truncation=True).to(device)
    with torch.no_grad():
        generated_tokens = model.generate(**inputs, max_length=128)
    return tokenizer.decode(generated_tokens[0], skip_special_tokens=True)


@api_view(['POST'])
def translate(request):
    if 'text' not in request.data:
        return JsonResponse({'error': 'No text provided'}, status=400)

    english_text = request.data['text']
    hindi_translation = translate_to_hindi(english_text)

    return JsonResponse({'translated_text': hindi_translation})
