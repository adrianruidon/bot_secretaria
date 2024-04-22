from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import pandas as pd

class ActionShowDegrees(Action):
    def name(self) -> Text:
        return "action_show_degrees"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Leer el archivo CSV usando ';' como separador
        df = pd.read_csv('csvs/grados.csv', sep=';')

        # Construir el mensaje a enviar
        message = "**Lista de Grados y Turnos:**\n\n"
        for index, row in df.iterrows():
            message += f"- {row['GRADO']} está disponible en {row['TURNO']}.\n\n"

        # Enviar mensaje
        dispatcher.utter_message(text=message)

        return []