# -- coding: utf-8 --
"""Clasificación de clientes.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1R1DwxYwG5HdeAiqZmQVch4_h0Cpd3CDg

"""
from ucimlrepo import fetch_ucirepo
import openai
import os 
from dotenv import load_dotenv

load_dotenv()

bank_marketing = fetch_ucirepo(id=222)



entradas = bank_marketing.data.features

openai.organization = os.getenv("ORGANIZATION_ID")
openai.api_key = os.getenv("API_KEY")


def write_string_to_file(content, file_path):
    try:
        with open(file_path, 'w') as file:
            file.write(content)
        print("String written to file successfully.")
        return file_path
    except Exception as e:
        print(f"Error occurred while writing to file: {e}")
        return None
    
def read_file_to_string(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
        print("File read successfully.")
        return content
    except Exception as e:
        print(f"Error occurred while reading the file: {e}")
        return None

def append_string_to_file(string_to_append, file_path):
    """
    Appends a string to a file.

    Args:
        file_path (str): The path to the file.
        string_to_append (str): The string to append to the file.
    """
    try:
        # Open the file in append mode ('a' or 'a+')
        with open(file_path, 'a') as file:
            # Append the string to the file
            file.write(string_to_append)
    except Exception as e:
        print(f"An error occurred: {str(e)}")

    
secretPrompt = "Vas a actuar como un asesor financiero, tu trabajo es clasificar el siguiente ejemplo dentro de una de las siguientes campos: Retail Clients, High Net Worth, Corporate Client, SME, Institutional Client y lo vas a describir sin usar las partes sobre el estudio de marketing"

respuesta = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": secretPrompt},
                        {"role": "user", "content": str(entradas.loc[0])}
                    ]
                    )

respString = respuesta["choices"][0]["message"]["content"]

file_path_historial = "hackmty/src/Python/Responses/historialDeMensajes.txt"
file_exists = os.path.exists(file_path_historial)

if file_exists:
    append_string_to_file(respString, file_path_historial)
else:
    write_string_to_file(respString, file_path_historial)

contextOfTheUser = respuesta["choices"][0]["message"]["content"] + read_file_to_string(file_path_historial)

consejoFinanciero = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": contextOfTheUser},
                        {"role": "system", "content": "Evita decir que eres una Inteligencia Artificial, evita redirigirlo a un asesor bancario o banco"},
                        {"role": "user", "content": "En el caso de que este cliente quisiera invertir en cetes directo, que es lo que el banco le recomendaría?"}
                    ]
                    )

resp = consejoFinanciero["choices"][0]["message"]["content"]
if file_exists:
    append_string_to_file(resp, file_path_historial)
else:
    write_string_to_file(resp, file_path_historial)

file_path_respActual = "hackmty/src/Python/Responses/respuestaActual.txt"
write_string_to_file(resp, file_path_respActual)