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

        # Crear y enviar detalles de cada grado
        for index, row in df.iterrows():
            dispatcher.utter_message(response="utter_inform_turnos_disponibles",
                                     grad=row['GRADO'],
                                     turn=row['TURNO'])

        return []