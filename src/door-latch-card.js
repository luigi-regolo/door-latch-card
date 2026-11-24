/**
 * Door Latch Card — Home Assistant dashboard card. Version 1.0
 * Copyright (c) 2026 luigi-regolo. SPDX-License-Identifier: GPL-3.0-only.
 * Works on the lock domain, so it fits any lock integration.
 * The lock code, when the lock asks for one, is typed every time, is sent to Home Assistant and is never stored.
 * No external scripts, fonts, analytics or assets.
 */
(() => {
  'use strict';

  const VERSION = '1.1';
  const TAG = 'door-latch-card';
  const EDITOR_TAG = 'door-latch-card-editor';

  /* ---------------------------------------------------------------- data */
  // Material Design Icons (the icon set of Home Assistant), as inline paths.
  const IC = {
  "chev": "<path d=\"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z\"/>",
  "door": "<path d=\"M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z\"/>",
  "dooro": "<path d=\"M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z\"/>",
  "bat50": "<path d=\"M16,13H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z\"/>",
  "bata": "<path d=\"M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z\"/>",
  "bat": "<path d=\"M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z\"/>",
  "clock": "<path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"/>",
  "arr": "<path d=\"M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z\"/>",
  "lock": "<path d=\"M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z\"/>",
  "lockopen": "<path d=\"M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z\"/>",
  "wifi": "<path d=\"M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z\"/>",
  "shield": "<path d=\"M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z\"/>",
  "key": "<path d=\"M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z\"/>",
  "x": "<path d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\"/>",
  "check": "<path d=\"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z\"/>",
  "back": "<path d=\"M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z\"/>"
  };

  // Texts of the card. When the language is "auto", the words that Home Assistant already translates
  // (lock states, Lock, Unlock, Close, Unavailable) come from Home Assistant; everything else, and every
  // missing key or unsupported language, comes from here, with English as the fallback.
  const TR = {
  "it": {
  "locked": "Chiusa a chiave",
  "lockedS": "Chiusa",
  "unlocked": "Sbloccata",
  "unlocking": "Sblocco in corso…",
  "locking": "Chiusura in corso…",
  "waitConf": "Attendo la conferma della serratura",
  "jammed": "Serratura inceppata",
  "jammedSub": "Controlla la porta e riprova",
  "unavail": "Non disponibile",
  "unavailSub": "Nessuna risposta dalla serratura",
  "doorOpen": "Porta aperta",
  "doorOpenSub": "Serratura inserita: chiudi la porta",
  "unavailShort": "Non disp.",
  "closed": "Chiusa",
  "open": "Aperta",
  "cmdUnavail": "Comandi non disponibili",
  "manual": "Serve un intervento manuale",
  "readOnly": "Sola lettura · comandi disattivati",
  "busy": "In corso…",
  "lockBtn": "Blocca porta",
  "lockDoorOpen": "Chiudi la porta per bloccare",
  "slideOpen": "Sblocco completo",
  "slideOpenAria": "Apri la porta con lo sblocco completo. Premi Invio o scorri a destra",
  "boltTile": "Catenaccio",
  "boltSub": "Solo sblocco",
  "boltAria": "Sblocca solo il catenaccio: lo scrocco resta chiuso",
  "openBtn": "Apri porta",
  "slide": "Scorri per sbloccare",
  "slideAria": "Sblocca la porta. Premi Invio o scorri a destra",
  "detailsAria": "Dettagli e stato",
  "tDoor": "Porta",
  "tBat": "Batteria",
  "tEvents": "Eventi oggi",
  "evAria": "Eventi di oggi: {n}",
  "failed": "Comando non riuscito. Riprova.",
  "since": "Da {x}",
  "fewsec": "pochi secondi",
  "uh": "h",
  "umin": "min",
  "popTitle": "Dettagli e stato",
  "close": "Chiudi",
  "gLock": "Serratura",
  "state": "Stato",
  "lastChange": "Ultimo cambio",
  "commands": "Comandi",
  "enabled": "Abilitati",
  "readOnlyS": "Sola lettura",
  "codeUnlock": "Codice allo sblocco",
  "codeEvery": "Digitato ogni volta",
  "notRequired": "Non richiesto",
  "eventsToday": "Eventi oggi",
  "gDoor": "Porta",
  "doorSensor": "Sensore porta",
  "gDevice": "Dispositivo",
  "online": "Online",
  "battery": "Batteria",
  "connection": "Connessione",
  "noReply": "Nessuna risposta",
  "lastEvents": "Ultimi eventi",
  "kTitle": "Porta",
  "defTitle": "Porta d’ingresso",
  "now": "Ora",
  "after": "Dopo il comando",
  "codeReq": "Codice richiesto",
  "delAria": "Cancella l’ultima cifra",
  "unlockBtn": "Sblocca porta",
  "note": "Il codice si digita ogni volta e non viene mai salvato. Lo verifica Home Assistant.",
  "wrongCode": "Codice non corretto.",
  "noEntity": "Scegli la serratura",
  "noEntityS": "Apri l’editor e seleziona un’entità lock"
  },
  "en": {
  "locked": "Locked",
  "lockedS": "Locked",
  "unlocked": "Unlocked",
  "unlocking": "Unlocking…",
  "locking": "Locking…",
  "waitConf": "Waiting for the lock to confirm",
  "jammed": "Lock jammed",
  "jammedSub": "Check the door and try again",
  "unavail": "Unavailable",
  "unavailSub": "No response from the lock",
  "doorOpen": "Door open",
  "doorOpenSub": "Lock engaged: close the door",
  "unavailShort": "Unavail.",
  "closed": "Closed",
  "open": "Open",
  "cmdUnavail": "Commands unavailable",
  "manual": "Manual action needed",
  "readOnly": "Read-only · commands disabled",
  "busy": "In progress…",
  "lockBtn": "Lock door",
  "lockDoorOpen": "Close the door to lock",
  "slideOpen": "Full unlock",
  "slideOpenAria": "Open the door with a full unlock. Press Enter or slide right",
  "boltTile": "Deadbolt",
  "boltSub": "Unlock only",
  "boltAria": "Unlock the deadbolt only: the latch stays closed",
  "openBtn": "Open door",
  "slide": "Slide to unlock",
  "slideAria": "Unlock the door. Press Enter or slide right",
  "detailsAria": "Details and status",
  "tDoor": "Door",
  "tBat": "Battery",
  "tEvents": "Events today",
  "evAria": "Events today: {n}",
  "failed": "Command failed. Try again.",
  "since": "For {x}",
  "fewsec": "a few seconds",
  "uh": "h",
  "umin": "min",
  "popTitle": "Details and status",
  "close": "Close",
  "gLock": "Lock",
  "state": "State",
  "lastChange": "Last change",
  "commands": "Commands",
  "enabled": "Enabled",
  "readOnlyS": "Read-only",
  "codeUnlock": "Code to unlock",
  "codeEvery": "Typed every time",
  "notRequired": "Not required",
  "eventsToday": "Events today",
  "gDoor": "Door",
  "doorSensor": "Door sensor",
  "gDevice": "Device",
  "online": "Online",
  "battery": "Battery",
  "connection": "Connection",
  "noReply": "No response",
  "lastEvents": "Latest events",
  "kTitle": "Door",
  "defTitle": "Front door",
  "now": "Now",
  "after": "After the command",
  "codeReq": "Code required",
  "delAria": "Delete the last digit",
  "unlockBtn": "Unlock door",
  "note": "The code is typed every time and is never stored. Home Assistant verifies it.",
  "wrongCode": "Incorrect code.",
  "noEntity": "Choose the lock",
  "noEntityS": "Open the editor and select a lock entity"
  },
  "de": {
  "locked": "Verriegelt",
  "lockedS": "Verriegelt",
  "unlocked": "Entriegelt",
  "unlocking": "Wird entriegelt…",
  "locking": "Wird verriegelt…",
  "waitConf": "Warte auf Bestätigung des Schlosses",
  "jammed": "Schloss blockiert",
  "jammedSub": "Tür prüfen und erneut versuchen",
  "unavail": "Nicht verfügbar",
  "unavailSub": "Keine Antwort vom Schloss",
  "doorOpen": "Tür offen",
  "doorOpenSub": "Schloss verriegelt: Tür schließen",
  "unavailShort": "N. verf.",
  "closed": "Geschlossen",
  "open": "Offen",
  "cmdUnavail": "Befehle nicht verfügbar",
  "manual": "Manuelles Eingreifen nötig",
  "readOnly": "Nur lesen · Befehle deaktiviert",
  "busy": "Läuft…",
  "lockBtn": "Tür verriegeln",
  "lockDoorOpen": "Tür schließen zum Verriegeln",
  "slideOpen": "Vollständig entriegeln",
  "slideOpenAria": "Tür vollständig entriegeln und öffnen. Eingabetaste drücken oder nach rechts wischen",
  "boltTile": "Riegel",
  "boltSub": "Nur entriegeln",
  "boltAria": "Nur den Riegel entriegeln: die Falle bleibt zu",
  "openBtn": "Tür öffnen",
  "slide": "Zum Entriegeln wischen",
  "slideAria": "Tür entriegeln. Eingabetaste drücken oder nach rechts wischen",
  "detailsAria": "Details und Status",
  "tDoor": "Tür",
  "tBat": "Batterie",
  "tEvents": "Ereignisse heute",
  "evAria": "Ereignisse heute: {n}",
  "failed": "Befehl fehlgeschlagen. Bitte erneut versuchen.",
  "since": "Seit {x}",
  "fewsec": "wenigen Sekunden",
  "uh": "Std.",
  "umin": "Min.",
  "popTitle": "Details und Status",
  "close": "Schließen",
  "gLock": "Schloss",
  "state": "Status",
  "lastChange": "Letzte Änderung",
  "commands": "Befehle",
  "enabled": "Aktiviert",
  "readOnlyS": "Nur lesen",
  "codeUnlock": "Code zum Entriegeln",
  "codeEvery": "Wird jedes Mal eingegeben",
  "notRequired": "Nicht erforderlich",
  "eventsToday": "Ereignisse heute",
  "gDoor": "Tür",
  "doorSensor": "Türsensor",
  "gDevice": "Gerät",
  "online": "Online",
  "battery": "Batterie",
  "connection": "Verbindung",
  "noReply": "Keine Antwort",
  "lastEvents": "Letzte Ereignisse",
  "kTitle": "Tür",
  "defTitle": "Haustür",
  "now": "Jetzt",
  "after": "Nach dem Befehl",
  "codeReq": "Code erforderlich",
  "delAria": "Letzte Ziffer löschen",
  "unlockBtn": "Tür entriegeln",
  "note": "Der Code wird jedes Mal eingegeben und nie gespeichert. Home Assistant prüft ihn.",
  "wrongCode": "Falscher Code.",
  "noEntity": "Schloss wählen",
  "noEntityS": "Editor öffnen und eine Lock-Entität wählen"
  },
  "fr": {
  "locked": "Verrouillée",
  "lockedS": "Verrouillée",
  "unlocked": "Déverrouillée",
  "unlocking": "Déverrouillage…",
  "locking": "Verrouillage…",
  "waitConf": "En attente de la confirmation de la serrure",
  "jammed": "Serrure bloquée",
  "jammedSub": "Vérifiez la porte et réessayez",
  "unavail": "Indisponible",
  "unavailSub": "Aucune réponse de la serrure",
  "doorOpen": "Porte ouverte",
  "doorOpenSub": "Serrure enclenchée : fermez la porte",
  "unavailShort": "Indisp.",
  "closed": "Fermée",
  "open": "Ouverte",
  "cmdUnavail": "Commandes indisponibles",
  "manual": "Intervention manuelle requise",
  "readOnly": "Lecture seule · commandes désactivées",
  "busy": "En cours…",
  "lockBtn": "Verrouiller la porte",
  "lockDoorOpen": "Fermez la porte pour verrouiller",
  "slideOpen": "Déverrouillage complet",
  "slideOpenAria": "Ouvrir la porte avec un déverrouillage complet. Appuyez sur Entrée ou glissez vers la droite",
  "boltTile": "Pêne dormant",
  "boltSub": "Déverrouiller seul",
  "boltAria": "Déverrouiller le pêne dormant seul : le demi-tour reste fermé",
  "openBtn": "Ouvrir la porte",
  "slide": "Glissez pour déverrouiller",
  "slideAria": "Déverrouiller la porte. Appuyez sur Entrée ou glissez vers la droite",
  "detailsAria": "Détails et état",
  "tDoor": "Porte",
  "tBat": "Batterie",
  "tEvents": "Événements aujourd’hui",
  "evAria": "Événements aujourd’hui : {n}",
  "failed": "La commande a échoué. Réessayez.",
  "since": "Depuis {x}",
  "fewsec": "quelques secondes",
  "uh": "h",
  "umin": "min",
  "popTitle": "Détails et état",
  "close": "Fermer",
  "gLock": "Serrure",
  "state": "État",
  "lastChange": "Dernier changement",
  "commands": "Commandes",
  "enabled": "Activées",
  "readOnlyS": "Lecture seule",
  "codeUnlock": "Code au déverrouillage",
  "codeEvery": "Saisi à chaque fois",
  "notRequired": "Non requis",
  "eventsToday": "Événements aujourd’hui",
  "gDoor": "Porte",
  "doorSensor": "Capteur de porte",
  "gDevice": "Appareil",
  "online": "En ligne",
  "battery": "Batterie",
  "connection": "Connexion",
  "noReply": "Aucune réponse",
  "lastEvents": "Derniers événements",
  "kTitle": "Porte",
  "defTitle": "Porte d’entrée",
  "now": "Maintenant",
  "after": "Après la commande",
  "codeReq": "Code requis",
  "delAria": "Effacer le dernier chiffre",
  "unlockBtn": "Déverrouiller la porte",
  "note": "Le code est saisi à chaque fois et n’est jamais enregistré. Home Assistant le vérifie.",
  "wrongCode": "Code incorrect.",
  "noEntity": "Choisissez la serrure",
  "noEntityS": "Ouvrez l’éditeur et sélectionnez une entité lock"
  }
  };
  const ETR = {
  "it": {
  "lang": "Lingua",
  "langH": "Automatica segue la lingua dell’utente in Home Assistant. Se la lingua non è disponibile si usa l’inglese.",
  "langAuto": "Automatica (Home Assistant)",
  "tSer": "Serratura",
  "tMod": "Moduli",
  "tAsp": "Aspetto",
  "optional": "(opzionale)",
  "pick": "Scegli un’entità…",
  "remove": "Rimuovi",
  "serDesc": "Scegli la serratura e come si presenta la card. Il codice non viene mai salvato nella card: lo digiti ogni volta e lo verifica Home Assistant.",
  "lblLock": "Entità serratura",
  "tipLock": "Qualsiasi entità del dominio lock.",
  "lblState": "Sensore stato serratura",
  "tipState": "Qualsiasi entità del dominio sensor. Se lo scegli, lo stato mostrato viene letto da qui; i comandi restano sull’entità lock.",
  "cmd": "Comandi attivi",
  "cmdH": "Scorri per sbloccare e pulsante Blocca porta. Spenti: la card resta in sola lettura.",
  "code": "Codice allo sblocco",
  "codeH": "Mostra il tastierino prima di sbloccare. Il blocco non richiede mai il codice. Funziona solo se la serratura accetta un codice.",
  "modDesc": "Scegli le entità di ogni modulo dai selettori. Un modulo senza entità non compare. Il sensore porta e la batteria sono opzionali.",
  "mDoor": "Porta",
  "mDoorH": "Chiusa o aperta, letta da un binary_sensor. Può essere quello della serratura o un contatto esterno, per esempio quello dell’allarme.",
  "mDoorTip": "Qualsiasi binary_sensor di tipo porta, finestra o apertura.",
  "mBat": "Batteria",
  "mBatH": "Livello con icona e colore in base alla carica.",
  "mBatTip": "Qualsiasi sensor di tipo batteria.",
  "mEv": "Eventi oggi",
  "mEvH": "Numero totale di eventi della serratura di oggi (chiusure e aperture). Non richiede entità.",
  "active": "Modulo attivo",
  "thr": "Soglie di colore",
  "low": "Bassa (ambra)",
  "crit": "Critica (rossa)",
  "thrDef": "Predefiniti 30% e 15%.",
  "up": "Sposta su {x}",
  "down": "Sposta giù {x}",
  "eyebrow": "Intestazione superiore",
  "title": "Titolo",
  "titleH": "Il punto verde finale lo aggiunge la card.",
  "showEyebrow": "Mostra intestazione superiore",
  "showTitle": "Mostra titolo",
  "full": "Tutta la larghezza disponibile su tablet e desktop",
  "fullH": "Se è disattivato la card resta stretta al centro.",
  "theme": "Tema",
  "thAuto": "Automatico (Home Assistant)",
  "thLight": "Light Edera",
  "thDark": "Dark Edera",
  "eEntity": "Seleziona l’entità lock della serratura: senza non posso mostrare né comandare la porta.",
  "eLow": "Inserisci un valore tra 1 e 100.",
  "eCrit": "Inserisci un valore tra 0 e 100.",
  "eCritLow": "La soglia critica deve essere più bassa di quella bassa."
  },
  "en": {
  "lang": "Language",
  "langH": "Automatic follows the user’s language in Home Assistant. If the language is not available, English is used.",
  "langAuto": "Automatic (Home Assistant)",
  "tSer": "Lock",
  "tMod": "Modules",
  "tAsp": "Appearance",
  "optional": "(optional)",
  "pick": "Choose an entity…",
  "remove": "Remove",
  "serDesc": "Choose the lock and how the card looks. The code is never saved in the card: you type it every time and Home Assistant verifies it.",
  "lblLock": "Lock entity",
  "tipLock": "Any entity of the lock domain.",
  "lblState": "Lock state sensor",
  "tipState": "Any entity of the sensor domain. If you choose one, the state shown is read from it; commands stay on the lock entity.",
  "cmd": "Commands enabled",
  "cmdH": "Slide to unlock and the Lock door button. Off: the card stays read-only.",
  "code": "Code to unlock",
  "codeH": "Shows the keypad before unlocking. Locking never asks for the code. Works only if the lock accepts a code.",
  "modDesc": "Choose the entities of each module with the selectors. A module without an entity is not shown. The door sensor and the battery are optional.",
  "mDoor": "Door",
  "mDoorH": "Closed or open, read from a binary_sensor. It can be the lock’s own or an external contact, for example the alarm’s.",
  "mDoorTip": "Any binary_sensor of type door, window or opening.",
  "mBat": "Battery",
  "mBatH": "Level with icon and colour based on charge.",
  "mBatTip": "Any sensor of type battery.",
  "mEv": "Events today",
  "mEvH": "Total number of lock events today (lockings and unlockings). Needs no entity.",
  "active": "Module enabled",
  "thr": "Colour thresholds",
  "low": "Low (amber)",
  "crit": "Critical (red)",
  "thrDef": "Defaults: 30% and 15%.",
  "up": "Move {x} up",
  "down": "Move {x} down",
  "eyebrow": "Top label",
  "title": "Title",
  "titleH": "The green dot after the title is added by the card.",
  "showEyebrow": "Show top label",
  "showTitle": "Show title",
  "full": "Full available width on tablet and desktop",
  "fullH": "If off, the card stays narrow in the centre.",
  "theme": "Theme",
  "thAuto": "Automatic (Home Assistant)",
  "thLight": "Light Edera",
  "thDark": "Dark Edera",
  "eEntity": "Select the lock entity: without it I can neither show nor control the door.",
  "eLow": "Enter a value between 1 and 100.",
  "eCrit": "Enter a value between 0 and 100.",
  "eCritLow": "The critical threshold must be lower than the low one."
  },
  "de": {
  "lang": "Sprache",
  "langH": "Automatisch folgt der Sprache des Benutzers in Home Assistant. Ist die Sprache nicht verfügbar, wird Englisch verwendet.",
  "langAuto": "Automatisch (Home Assistant)",
  "tSer": "Schloss",
  "tMod": "Module",
  "tAsp": "Aussehen",
  "optional": "(optional)",
  "pick": "Entität wählen…",
  "remove": "Entfernen",
  "serDesc": "Wähle das Schloss und das Aussehen der Karte. Der Code wird nie in der Karte gespeichert: Du gibst ihn jedes Mal ein und Home Assistant prüft ihn.",
  "lblLock": "Schloss-Entität",
  "tipLock": "Jede Entität der Domain lock.",
  "lblState": "Statussensor des Schlosses",
  "tipState": "Jede Entität der Domain sensor. Wenn du einen wählst, wird der angezeigte Status von dort gelesen; die Befehle bleiben auf der lock-Entität.",
  "cmd": "Befehle aktiv",
  "cmdH": "Zum Entriegeln wischen und Schaltfläche Tür verriegeln. Aus: Die Karte bleibt schreibgeschützt.",
  "code": "Code zum Entriegeln",
  "codeH": "Zeigt vor dem Entriegeln das Tastenfeld. Das Verriegeln verlangt nie den Code. Funktioniert nur, wenn das Schloss einen Code akzeptiert.",
  "modDesc": "Wähle die Entitäten jedes Moduls mit den Auswahlfeldern. Ein Modul ohne Entität wird nicht angezeigt. Türsensor und Batterie sind optional.",
  "mDoor": "Tür",
  "mDoorH": "Geschlossen oder offen, gelesen von einem binary_sensor. Das kann der des Schlosses oder ein externer Kontakt sein, zum Beispiel der der Alarmanlage.",
  "mDoorTip": "Jeder binary_sensor vom Typ Tür, Fenster oder Öffnung.",
  "mBat": "Batterie",
  "mBatH": "Füllstand mit Symbol und Farbe je nach Ladung.",
  "mBatTip": "Jeder sensor vom Typ Batterie.",
  "mEv": "Ereignisse heute",
  "mEvH": "Gesamtzahl der Schlossereignisse von heute (Verriegelungen und Entriegelungen). Braucht keine Entität.",
  "active": "Modul aktiv",
  "thr": "Farbschwellen",
  "low": "Niedrig (gelb)",
  "crit": "Kritisch (rot)",
  "thrDef": "Standard: 30 % und 15 %.",
  "up": "{x} nach oben",
  "down": "{x} nach unten",
  "eyebrow": "Obere Zeile",
  "title": "Titel",
  "titleH": "Den grünen Punkt nach dem Titel fügt die Karte hinzu.",
  "showEyebrow": "Obere Zeile anzeigen",
  "showTitle": "Titel anzeigen",
  "full": "Volle verfügbare Breite auf Tablet und Desktop",
  "fullH": "Wenn aus, bleibt die Karte schmal und zentriert.",
  "theme": "Design",
  "thAuto": "Automatisch (Home Assistant)",
  "thLight": "Light Edera",
  "thDark": "Dark Edera",
  "eEntity": "Wähle die lock-Entität des Schlosses: ohne sie kann ich die Tür weder anzeigen noch steuern.",
  "eLow": "Gib einen Wert zwischen 1 und 100 ein.",
  "eCrit": "Gib einen Wert zwischen 0 und 100 ein.",
  "eCritLow": "Die kritische Schwelle muss niedriger sein als die niedrige."
  },
  "fr": {
  "lang": "Langue",
  "langH": "Automatique suit la langue de l’utilisateur dans Home Assistant. Si la langue n’est pas disponible, l’anglais est utilisé.",
  "langAuto": "Automatique (Home Assistant)",
  "tSer": "Serrure",
  "tMod": "Modules",
  "tAsp": "Apparence",
  "optional": "(facultatif)",
  "pick": "Choisir une entité…",
  "remove": "Retirer",
  "serDesc": "Choisissez la serrure et l’apparence de la carte. Le code n’est jamais enregistré dans la carte : vous le saisissez à chaque fois et Home Assistant le vérifie.",
  "lblLock": "Entité serrure",
  "tipLock": "Toute entité du domaine lock.",
  "lblState": "Capteur d’état de la serrure",
  "tipState": "Toute entité du domaine sensor. Si vous en choisissez une, l’état affiché en est lu ; les commandes restent sur l’entité serrure.",
  "cmd": "Commandes activées",
  "cmdH": "Glisser pour déverrouiller et bouton Verrouiller la porte. Désactivé : la carte reste en lecture seule.",
  "code": "Code au déverrouillage",
  "codeH": "Affiche le clavier avant le déverrouillage. Le verrouillage ne demande jamais de code. Fonctionne seulement si la serrure accepte un code.",
  "modDesc": "Choisissez les entités de chaque module avec les sélecteurs. Un module sans entité n’est pas affiché. Le capteur de porte et la batterie sont facultatifs.",
  "mDoor": "Porte",
  "mDoorH": "Fermée ou ouverte, lue depuis un binary_sensor. Peut être celui de la serrure ou un contact externe, par exemple celui de l’alarme.",
  "mDoorTip": "Tout binary_sensor de type porte, fenêtre ou ouverture.",
  "mBat": "Batterie",
  "mBatH": "Niveau avec icône et couleur selon la charge.",
  "mBatTip": "Tout capteur de type batterie.",
  "mEv": "Événements aujourd’hui",
  "mEvH": "Nombre total d’événements de la serrure aujourd’hui (verrouillages et déverrouillages). Aucune entité requise.",
  "active": "Module activé",
  "thr": "Seuils de couleur",
  "low": "Bas (ambre)",
  "crit": "Critique (rouge)",
  "thrDef": "Par défaut : 30 % et 15 %.",
  "up": "Monter {x}",
  "down": "Descendre {x}",
  "eyebrow": "Texte supérieur",
  "title": "Titre",
  "titleH": "Le point vert après le titre est ajouté par la carte.",
  "showEyebrow": "Afficher le texte supérieur",
  "showTitle": "Afficher le titre",
  "full": "Toute la largeur disponible sur tablette et ordinateur",
  "fullH": "Si désactivé, la carte reste étroite au centre.",
  "theme": "Thème",
  "thAuto": "Automatique (Home Assistant)",
  "thLight": "Edera clair",
  "thDark": "Edera sombre",
  "eEntity": "Sélectionnez l’entité serrure : sans elle, je ne peux ni afficher ni commander la porte.",
  "eLow": "Saisissez une valeur entre 1 et 100.",
  "eCrit": "Saisissez une valeur entre 0 et 100.",
  "eCritLow": "Le seuil critique doit être inférieur au seuil bas."
  }
  };
  const LANGS = [['it', 'Italiano'], ['en', 'English'], ['de', 'Deutsch'], ['fr', 'Français']];
  const HA_KEYS = { lockBtn: 'ui.card.lock.lock', unlockBtn: 'ui.card.lock.unlock', close: 'ui.common.close', unavail: 'state.default.unavailable' };
  const HA_STATE = { locked: 1, unlocked: 1, locking: 1, unlocking: 1, jammed: 1 };

  const MOD_ORDER = ['door', 'battery', 'events'];
  const DEFAULTS = {
    entity: '', state_sensor: '', commands: true, require_code: false, show_eyebrow: true, eyebrow: 'Door Latch Card',
    show_title: true, title: '', width: 'full', theme_mode: 'auto', language: 'auto'
  };
  const BAT_LOW = 30, BAT_CRIT = 15, PEND_MS = 25000, CMD_STATES = { locked: 1, unlocked: 1, locking: 1, unlocking: 1, jammed: 1 };

  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const stOf = (h, id) => (h && h.states && id ? h.states[id] : undefined);
  const midnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const num = (v, d) => { const n = Number(v); return v !== '' && v != null && isFinite(n) ? n : d; };
  const ico = (n, c) => '<svg class="' + (c || 'i') + '" viewBox="0 0 24 24" aria-hidden="true">' + IC[n] + '</svg>';

  function normalizeConfig(raw) {
    const r = raw && typeof raw === 'object' ? raw : {};
    const o = Object.assign({}, DEFAULTS);
    ['entity', 'state_sensor'].forEach((k) => { o[k] = typeof r[k] === 'string' ? r[k] : ''; });
    o.commands = r.commands !== false;
    o.require_code = r.require_code === true;
    o.show_eyebrow = r.show_eyebrow !== false;
    o.show_title = r.show_title !== false;
    o.eyebrow = typeof r.eyebrow === 'string' ? r.eyebrow : DEFAULTS.eyebrow;
    o.title = typeof r.title === 'string' ? r.title : '';
    o.width = r.width === 'center' ? 'center' : 'full';
    o.theme_mode = r.theme_mode === 'light' || r.theme_mode === 'dark' ? r.theme_mode : 'auto';
    o.language = LANGS.some((l) => l[0] === r.language) ? r.language : 'auto';
    const ord = Array.isArray(r.order) ? r.order.filter((k, i, a) => MOD_ORDER.indexOf(k) >= 0 && a.indexOf(k) === i) : [];
    o.order = ord.concat(MOD_ORDER.filter((k) => ord.indexOf(k) < 0));
    const m = r.mods && typeof r.mods === 'object' ? r.mods : {};
    const g = (k) => (m[k] && typeof m[k] === 'object' ? m[k] : {});
    o.mods = {
      door: { on: g('door').on !== false, entity: typeof g('door').entity === 'string' ? g('door').entity : '' },
      battery: { on: g('battery').on !== false, entity: typeof g('battery').entity === 'string' ? g('battery').entity : '', low: num(g('battery').low, BAT_LOW), critical: num(g('battery').critical, BAT_CRIT) },
      events: { on: g('events').on !== false }
    };
    return o;
  }

  /* ---------------------------------------------------------------- styles */
  const CARD_CSS = `:host{display:block;--font:var(--ha-font-family-body,Roboto,Arial,sans-serif)}
*{box-sizing:border-box}
button{font:inherit}
.hc,.ov.light,.sh.light{--s:#fafbf9;--s2:#f0f2ef;--cir:#ffffff;--t:#18221c;--t2:#56675c;--ln:#e0e5df;
  --ok:#0a7156;--okx:#0a7156;--wr:#d3bd63;--wrx:#5f4a10;--wrb:#f9f3de;--er:#b83a42;--erx:#ae4742;--nt:#858E89;--ntx:#56675c;--dotc:#0a7156;--btn:#0a7156}
.hc.dark,.ov.dark,.sh.dark{--s:#101211;--s2:#191c1a;--cir:#282b29;--t:#f5f7f4;--t2:#bbc5bd;--ln:#2b302c;--ok:#0e795d;--okx:#0e795d;--wr:#816e31;--wrx:#f1d78b;--wrb:#302b1b;--er:#b83a42;--erx:#e85e64;--nt:#8B918E;--ntx:#bbc5bd;--dotc:#0e795d;--btn:#f5f7f4}
.hc{width:100%;max-width:400px;margin:0 auto;background:var(--s);color:var(--t);border:1px solid var(--ln);border-radius:26px;padding:13px;font-family:var(--font);font-size:var(--ha-font-size-m,14px);line-height:1.4;min-width:0}
.c-ok{--c:var(--ok);--cx:var(--okx)}.c-wr{--c:var(--wr);--cx:var(--wrx)}.c-er{--c:var(--er);--cx:var(--erx)}.c-nt{--c:var(--nt);--cx:var(--ntx)}
.hc svg.i{width:18px;height:18px;fill:currentColor;stroke:none;flex:none;display:block}
.hd{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:2px 4px 0}
.hd>div{min-width:0}
.eb{font-size:10px;letter-spacing:1.7px;text-transform:uppercase;color:var(--t2);font-weight:750;margin-bottom:7px;overflow-wrap:anywhere}
.ti{display:flex;align-items:baseline;gap:0;font-size:20px;line-height:1.14;font-weight:800;letter-spacing:-.7px;min-width:0}
.ti span.tx{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dp{color:var(--dotc);flex:none;font-weight:inherit}
.rb{width:36px;height:36px;border-radius:50%;border:1px solid color-mix(in srgb,var(--ok) 45%,transparent);background:color-mix(in srgb,var(--ok) 12%,transparent);color:var(--btn);display:grid;place-items:center;cursor:pointer;flex:none;padding:0;-webkit-tap-highlight-color:transparent}
.hero{display:grid;place-items:center;margin:12px 0 4px;position:relative;isolation:isolate}
.hero::before{content:"";position:absolute;left:50%;top:-17px;width:290px;height:190px;margin-left:-145px;z-index:-1;pointer-events:none;
  background:radial-gradient(closest-side,color-mix(in srgb,var(--c) 26%,transparent),color-mix(in srgb,var(--c) 8%,transparent) 62%,transparent);animation:breathe 4.8s ease-in-out infinite}
.hc.c-nt .hero::before{animation:none;opacity:.4}
.st-jammed .hero::before{animation-duration:1.6s}
@keyframes breathe{0%,100%{opacity:.55;transform:scale(.96)}50%{opacity:1;transform:scale(1.04)}}
.dial{position:relative;width:156px;height:156px}
.dial>svg.tks{position:absolute;inset:0;width:156px;height:156px}
.okr{position:absolute;left:0;top:0;width:156px;height:156px;transform:rotate(-90deg);pointer-events:none}
.okr circle{fill:none;stroke:var(--c);stroke-width:3;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:ring 1.5s ease-out forwards}
.okb{position:absolute;right:4px;top:4px;width:30px;height:30px;border-radius:50%;background:var(--c);color:#fff;display:grid;place-items:center;opacity:0;
  box-shadow:0 6px 14px -4px color-mix(in srgb,var(--c) 70%,transparent);animation:badge 1.7s cubic-bezier(.3,1.5,.5,1) forwards;pointer-events:none}
.okb svg.i{width:20px;height:20px}
.fx-ok .knob{animation:pop .7s ease-out}
.fx-err .knob{animation:errshake .6s ease-in-out}
.fx-err .okr circle{stroke:var(--er)}
.fx-err .okb{background:var(--er)!important;color:#fff!important}
.c-wr .okb{color:var(--wrx);background:var(--wrb);box-shadow:inset 0 0 0 1.5px var(--wr)}
@keyframes ring{0%{stroke-dashoffset:1;opacity:1}55%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes badge{0%{transform:scale(.3);opacity:0}18%{transform:scale(1);opacity:1}75%{transform:scale(1);opacity:1}100%{transform:scale(1);opacity:0}}
@keyframes pop{0%{transform:scale(1)}35%{transform:scale(1.07)}100%{transform:scale(1)}}
@keyframes errshake{0%,100%{transform:none}15%{transform:translateX(-4px)}30%{transform:translateX(4px)}45%{transform:translateX(-3px)}60%{transform:translateX(3px)}75%{transform:translateX(-1px)}}
@media (prefers-reduced-motion:reduce){.hero::before,.okr circle,.okb,.knob,.tk,.sl .lb svg.i{animation:none!important}.knob .shk{transition:none}.okb{opacity:1}}
.tk{stroke:var(--c);stroke-width:2.4;stroke-linecap:round;opacity:.9}
.tk.m{stroke-width:3.2}
.c-nt .tk{opacity:.3}
.st-unlocking .tk,.st-locking .tk{animation:sweep 1.56s linear infinite;animation-delay:calc(var(--i)*26ms)}
.st-jammed .tk{animation:pulse 1.3s ease-in-out infinite}
@keyframes sweep{0%{opacity:1}55%,100%{opacity:.14}}
@keyframes pulse{0%,100%{opacity:.95}50%{opacity:.3}}
.knob{position:absolute;left:30px;top:30px;width:96px;height:96px;border-radius:50%;display:grid;place-items:center;
  background:radial-gradient(circle at 35% 28%,color-mix(in srgb,var(--c) 26%,var(--s)),color-mix(in srgb,var(--c) 9%,var(--s)));
  border:1px solid color-mix(in srgb,var(--c) 42%,transparent);
  box-shadow:0 0 0 7px color-mix(in srgb,var(--c) 8%,transparent),0 14px 30px -10px color-mix(in srgb,var(--c) 55%,transparent)}
.knob svg{grid-area:1/1;width:50px;height:50px;display:block;fill:var(--cx);transition:opacity .35s ease,transform .55s cubic-bezier(.3,1.4,.5,1)}
.knob .ko{opacity:0;transform:scale(.55) rotate(14deg)}
.opn .knob .kc{opacity:0;transform:scale(.55) rotate(-14deg)}
.opn .knob .ko{opacity:1;transform:none}
.st-jammed .knob{animation:shake 1.6s ease-in-out infinite}
@keyframes shake{0%,70%,100%{transform:none}76%{transform:translateX(-2px)}82%{transform:translateX(2px)}88%{transform:translateX(-1px)}}
.hl{font-size:20px;font-weight:700;letter-spacing:-.3px;text-align:center;margin-top:10px;text-wrap:balance}
.sb{font-size:13px;color:var(--t2);text-align:center;margin-top:2px}
.sb.er{color:var(--erx);font-weight:500}
.sl{position:relative;height:52px;border-radius:26px;background:var(--s2);border:1px solid var(--ln);overflow:hidden;margin-top:14px;user-select:none;-webkit-user-select:none;touch-action:pan-y}
.sl .fl{position:absolute;left:0;top:0;bottom:0;width:52px;background:color-mix(in srgb,var(--t) 9%,transparent);border-radius:26px}
.sl .lb{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;padding-left:44px;font-size:14px;font-weight:500;color:var(--t2);pointer-events:none}
.sl .lb svg.i{width:18px;height:18px;animation:nudge 1.8s ease-in-out infinite}
@keyframes nudge{0%,100%{transform:translateX(0);opacity:.5}50%{transform:translateX(4px);opacity:1}}
.sl .hdl{position:absolute;left:4px;top:4px;width:42px;height:42px;border-radius:50%;background:var(--t);color:var(--s);display:grid;place-items:center;cursor:grab;touch-action:none;border:0;padding:0;box-shadow:0 4px 12px -2px rgba(0,0,0,.35);-webkit-tap-highlight-color:transparent}
.sl .hdl:active{cursor:grabbing}
.sl.dis{opacity:.75}
.sl.dis .lb{padding-left:0}
.sl.dis .lb svg.i{animation:none}
.sl.dis .hdl{display:none}
.sl.dis .fl{display:none}
.bt{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:52px;margin-top:14px;border-radius:26px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;
  border:1px solid var(--wr);background:var(--wrb);color:var(--wrx);-webkit-tap-highlight-color:transparent}
.bt svg.i{color:var(--wrx)}
.bt:disabled{opacity:.55;cursor:not-allowed}
.bt:focus-visible,.t.act:focus-visible{outline:2px solid var(--wrx);outline-offset:2px}
.t.act{font:inherit;color:inherit;width:100%;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .12s,border-color .2s}
.t.act:hover:not(:disabled){border-color:var(--t2)}
.t.act:active:not(:disabled){transform:scale(.97)}
.t.act:disabled{opacity:.5;cursor:not-allowed}
.tl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}
.t{background:var(--s2);border:1px solid var(--ln);border-radius:18px;padding:11px 6px 10px;display:flex;flex-direction:column;align-items:center;gap:5px;min-width:0;text-align:center}
.t .ic{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--cir);color:var(--cx)}
.t.c-wr .ic{background:var(--wrb);box-shadow:inset 0 0 0 1px var(--wr);color:var(--wrx)}
.t.c-er .ic{background:var(--er);color:#fff}
.t b{font-size:12.5px;font-weight:700;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.t span{font-size:10.5px;color:var(--t2)}

/* ============ POPUP (standard v1.4, par. 7) ============ */
.ov{position:fixed;inset:0;z-index:50;display:none;place-items:center;padding:16px;background:rgba(8,12,10,.58);backdrop-filter:blur(3px);font-family:var(--font)}
.ov.on,.sh.on{display:grid}
.pop{display:flex;flex-direction:column;overflow:hidden;background:var(--s);color:var(--t);border:1px solid var(--ln);border-radius:24px;width:min(390px,100%);
  height:min(calc(100vh - 40px),680px);height:min(calc(100dvh - 40px),680px);box-shadow:0 30px 70px -20px rgba(0,0,0,.6)}
.ph{display:flex;align-items:center;justify-content:space-between;padding:16px 16px 12px 20px;background:var(--s);border-bottom:1px solid var(--ln);flex:none}
.ph h3{margin:0;font-size:18px;font-weight:600}
.pb{flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;padding:14px 16px 18px;display:grid;grid-template-columns:minmax(0,1fr);gap:12px;align-content:start}
@media (min-width:640px) and (min-height:600px){
  .pop{width:min(1120px,100%);height:min(80vh,560px);height:min(80dvh,560px)}
  .pb{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
}
.g{background:var(--s2);border-radius:18px;padding:12px 14px 4px;min-width:0}
.gh{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px}
.gh em{font-style:normal;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--t2);font-weight:500}
.pill{padding:3px 10px;border-radius:999px;font-size:12px;font-weight:500;white-space:nowrap;color:var(--cx);
  background:color-mix(in srgb,var(--c) 15%,transparent);border:1px solid color-mix(in srgb,var(--c) 40%,transparent)}
.r{display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid var(--ln);min-width:0}
.r:first-of-type{border-top:0}
.r .ic{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;flex:none;background:var(--cir);color:var(--t2);border:1px solid var(--ln)}
.r .ic svg{width:18px;height:18px;fill:currentColor;stroke:none;display:block}
.r .nm{flex:1;min-width:0;font-size:14px;overflow-wrap:anywhere}
.r .nm small{display:block;font-size:12px;color:var(--t2)}
.r .vl{font-size:13px;font-weight:500;text-align:right;flex:none;max-width:48%;overflow-wrap:anywhere}
.bar2{display:inline-block;vertical-align:middle;width:42px;height:6px;border-radius:3px;background:var(--ln);margin-right:8px;overflow:hidden}
.bar2 i{display:block;height:100%;background:var(--c)}
.xb{width:38px;height:38px;border-radius:50%;border:1px solid var(--ln);background:var(--s2);color:var(--t);display:grid;place-items:center;cursor:pointer;padding:0}
.xb svg{width:20px;height:20px;fill:currentColor;stroke:none;display:block}
.xb:focus-visible{outline:2px solid var(--ok);outline-offset:2px}

/* ============ CODICE (tastierino identico ad Alarm Keeper) ============ */
.sh{position:fixed;inset:0;z-index:60;display:none;place-items:center;padding:16px;background:rgba(8,12,10,.6);font-family:var(--font)}
.kdlg{width:min(390px,100%);height:min(calc(100vh - 40px),680px);height:min(calc(100dvh - 40px),680px);display:flex;flex-direction:column;background:var(--s);color:var(--t);border:1px solid var(--ln);border-radius:26px;overflow:hidden;box-shadow:0 18px 60px #0005}
@media (min-width:640px) and (min-height:600px){.kdlg{height:auto;max-height:min(calc(100dvh - 32px),680px)}}
.kmh{flex:none;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 16px 12px 18px;background:var(--s);border-bottom:1px solid var(--ln)}
.kmh h2{margin:0;font-size:17px;font-weight:600;line-height:1.3}
.kx{display:grid;place-items:center;margin:0;padding:0;width:40px;height:40px;flex:none;border:1px solid var(--ln);border-radius:50%;background:var(--s2);color:var(--t);cursor:pointer}
.kx svg{width:22px;height:22px;fill:currentColor;stroke:none;display:block}
.kmb{flex:1 1 auto;min-height:0;overflow-y:auto;padding:12px 18px 18px}
.abig{display:flex;align-items:center;gap:12px;margin:4px 0 12px;padding:14px;border-radius:24px;background:var(--s2);border:1px solid var(--ln)}
.orb{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--dotc);color:#fff;flex:none}
.orb svg{width:26px;height:26px;fill:currentColor;stroke:none;display:block}
.vt{font-size:17px;font-weight:700;letter-spacing:-.3px}.vs{font-size:11.5px;color:var(--t2);margin-top:2px}
.ast{display:flex;gap:8px;margin-bottom:14px}.ast>div{flex:1;padding:10px 12px;border-radius:16px;background:var(--s2);border:1px solid var(--ln)}.ast span{display:block;font-size:11px;color:var(--t2)}.ast b{display:block;margin-top:3px;font-size:13px}
.klbl{margin:0 4px 8px;color:var(--t2);font-size:10px;letter-spacing:1.3px;font-weight:600;text-transform:uppercase;text-align:center}
.dotrow{display:flex;justify-content:center;align-items:center;min-height:28px;margin-bottom:4px}
.dts{display:flex;gap:12px;justify-content:center;min-height:14px}.dts i{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--t2)}.dts i.f{background:var(--t);border-color:var(--t)}
.err{text-align:center;color:var(--erx);font-size:12.5px;font-weight:600;min-height:18px;margin:2px 0 6px}
.keys{display:grid;grid-template-columns:repeat(3,72px);gap:10px;justify-content:center;margin:4px 0 14px}
.keys button{width:72px;height:56px;border-radius:18px;border:1px solid var(--ln);background:var(--s2);padding:0;display:flex;align-items:center;justify-content:center;line-height:1;color:var(--t);cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent}
.keys button:active{background:var(--ln)}
.keys b{font-size:24px;font-weight:500}
.keys .bk{border-color:transparent;background:transparent}.keys .bk svg{width:28px;height:28px;fill:currentColor;stroke:none;display:block}.keys .bk[disabled]{opacity:.35;cursor:default}
@media (max-height:720px){.keys button{height:48px}.keys{gap:8px 10px}.keys b{font-size:22px}}
.acta{display:block;width:100%;min-height:46px;border-radius:999px;background:var(--dotc);color:#fff;border:0;font:inherit;font-size:14px;font-weight:600;cursor:pointer}.acta[disabled]{opacity:.45;cursor:default}
.knote{text-align:center;margin-top:10px;font-size:12px;color:var(--t2)}
.shake{animation:sk .35s}@keyframes sk{20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
.keys button:focus-visible,.kx:focus-visible,.acta:focus-visible{outline:2px solid var(--ok);outline-offset:2px}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

.hc.full{max-width:none}
.hc.c-nt .hero .hl{font-size:18px}
`;
  const EDITOR_CSS = `
:host{display:block;color:var(--primary-text-color,#19221E);font-family:var(--ha-font-family-body,Roboto,Arial,sans-serif)}
*{box-sizing:border-box}
.ed{font-size:14px}
button,input,select{font:inherit;color:inherit}
.tabs{display:flex;gap:5px;overflow-x:auto;padding-bottom:14px;border-bottom:1px solid var(--divider-color,#E1E5E1)}
.tab{border:0;background:none;color:var(--secondary-text-color,#68716C);border-radius:13px;padding:10px 13px;white-space:nowrap;cursor:pointer}
.tab[aria-pressed="true"]{color:var(--primary-text-color,#19221E);background:var(--secondary-background-color,#F1F3EF);font-weight:650}
.heading{font-size:21px;font-weight:500;margin:25px 0 9px}
.desc{color:var(--secondary-text-color,#68716C);font-size:13px;line-height:1.5;margin-bottom:20px}
.field{display:block;margin:18px 0}
.label{font-size:14px;margin-bottom:10px}
.input{display:block;width:100%;background:var(--secondary-background-color,#F1F3EF);color:var(--primary-text-color,#19221E);border:0;border-bottom:1px solid var(--divider-color,#E1E5E1);padding:14px 13px;min-height:50px;border-radius:11px 11px 0 0}
.row{border-bottom:1px solid var(--divider-color,#E1E5E1);padding:13px 0;display:flex;align-items:center;justify-content:space-between;gap:15px}
.row label{flex:1;min-width:0}
.row input[type=checkbox]{width:18px;height:18px;accent-color:var(--primary-color,#064E3B);flex:none}
.muted{font-size:12px;line-height:1.5;color:var(--secondary-text-color,#68716C)}
.tiny{font-size:11px;color:var(--secondary-text-color,#68716C);margin:9px 0}
.action{background:var(--secondary-background-color,#F1F3EF);border:1px solid var(--divider-color,#E1E5E1);color:var(--primary-text-color,#19221E);padding:5px 9px;min-width:34px;border-radius:10px;cursor:pointer}
.action:disabled{opacity:.45;cursor:not-allowed}
.mod{border-bottom:1px solid var(--divider-color,#E1E5E1);padding:16px 0}
.mh{display:flex;align-items:center;gap:10px}
.mh .nm{flex:1;min-width:0;font-weight:600;font-size:15px}
.ctl{display:flex;gap:6px;flex:none}
.mb{margin-top:10px}
.chk{display:flex;align-items:center;gap:10px;margin:8px 0;font-size:13px}
.chk input{width:18px;height:18px;accent-color:var(--primary-color,#064E3B)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.errt{color:var(--error-color,#B3261E);font-size:12px;margin:6px 0 2px}
`;

  const TK = (() => {
    let h = '';
    for (let i = 0; i < 60; i++) {
      const m = i % 5 === 0, r1 = m ? 66 : 68, r2 = 74, a = i * 6 * Math.PI / 180;
      h += '<line class="tk' + (m ? ' m' : '') + '" style="--i:' + i + '" x1="' + (78 + r1 * Math.sin(a)).toFixed(2) + '" y1="' + (78 - r1 * Math.cos(a)).toFixed(2) + '" x2="' + (78 + r2 * Math.sin(a)).toFixed(2) + '" y2="' + (78 - r2 * Math.cos(a)).toFixed(2) + '"/>';
    }
    return '<svg class="tks" viewBox="0 0 156 156" aria-hidden="true">' + h + '</svg>';
  })();

  const baseLang = (h) => {
    const l = h && ((h.locale && h.locale.language) || h.language);
    return typeof l === 'string' ? l.toLowerCase().split(/[-_]/)[0] : 'en';
  };
  const pickLang = (cfgLang, h) => {
    const l = cfgLang && cfgLang !== 'auto' ? cfgLang : baseLang(h);
    return TR[l] ? l : 'en';
  };

  /* ------------------------------------------------------------ the card */
  class DoorLatchCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = '<style>' + CARD_CSS + '</style><div id="c"></div><div id="ov" class="ov"></div><div id="sh" class="sh"></div>';
      this._c = this.shadowRoot.getElementById('c');
      this._ov = this.shadowRoot.getElementById('ov');
      this._sh = this.shadowRoot.getElementById('sh');
      this._cfg = null; this._hass = null; this._sig = null;
      this._pend = null; this._flash = null; this._msg = '';
      this._popup = false; this._code = ''; this._err = ''; this._shake = false; this._kbusy = false; this._keypad = false;
      this._ev = null; this._evList = []; this._hb = false; this._hk = ''; this._ha = 0;
      this._timers = {};
      this._onKey = (e) => this._key(e);
      this.shadowRoot.addEventListener('click', (e) => this._click(e));
    }

    static getStubConfig(hass) {
      const c = {};
      const ids = hass && hass.states ? Object.keys(hass.states).filter((i) => i.indexOf('lock.') === 0) : [];
      if (ids.length) c.entity = ids[0];
      return c;
    }
    static getConfigElement() { return document.createElement(EDITOR_TAG); }
    getCardSize() { return 6; }
    getGridOptions() { return { columns: 12, min_columns: 6 }; }

    setConfig(config) {
      if (!config || typeof config !== 'object') throw new Error('Invalid configuration');
      this._cfg = normalizeConfig(config);
      this._sig = null; this._hk = ''; this._ev = null; this._evList = [];
      this._render();
    }
    set hass(h) {
      this._hass = h;
      if (!this._cfg) return;
      this._settle();
      this._history();
      const sig = this._signature();
      if (sig === this._sig) return;
      this._sig = sig;
      this._render();
    }
    get hass() { return this._hass; }

    connectedCallback() { this._timers.tick = window.setInterval(() => { if (this._cfg && this._hass) { this._history(); this._sig = null; this._render(); } }, 60000); }
    disconnectedCallback() {
      document.removeEventListener('keydown', this._onKey, true);
      Object.keys(this._timers).forEach((k) => { window.clearInterval(this._timers[k]); window.clearTimeout(this._timers[k]); });
      this._timers = {};
    }

    /* ---- language and texts ---- */
    _lang() { return pickLang(this._cfg && this._cfg.language, this._hass); }
    _auto() { return !this._cfg || this._cfg.language === 'auto'; }
    _t(k, v) {
      let s = '';
      if (this._auto() && HA_KEYS[k] && this._hass && typeof this._hass.localize === 'function') {
        try { s = this._hass.localize(HA_KEYS[k]) || ''; } catch (e) { s = ''; }
      }
      if (!s) s = (TR[this._lang()] && TR[this._lang()][k]) || TR.en[k] || k;
      if (v) for (const x in v) s = s.replace('{' + x + '}', v[x]);
      return s;
    }
    // State words that Home Assistant translates: used only when the shown state is the real state of the entity.
    _stateText(key, real) {
      if (this._auto() && real && HA_STATE[key] && this._hass && typeof this._hass.formatEntityState === 'function') {
        try { const s = this._hass.formatEntityState(real); if (s && typeof s === 'string' && s !== real.state) return s; } catch (e) { /* use the card texts */ }
      }
      return '';
    }
    _time(ms) { try { return new Date(ms).toLocaleTimeString(this._lang(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
    _when(ms) {
      if (!Number.isFinite(ms)) return '—';
      const d = new Date(ms);
      try {
        return d.toDateString() === new Date().toDateString() ? this._time(ms) : d.toLocaleDateString(this._lang(), { day: 'numeric', month: 'short' }) + ' ' + this._time(ms);
      } catch (e) { return this._time(ms); }
    }
    _ago(ms) {
      const s = Math.max(0, (Date.now() - ms) / 1000);
      if (!isFinite(s) || s < 60) return this._t('fewsec');
      if (s < 3600) return Math.floor(s / 60) + ' ' + this._t('umin');
      return Math.floor(s / 3600) + ' ' + this._t('uh');
    }

    _mode() {
      const m = this._cfg.theme_mode;
      if (m === 'light' || m === 'dark') return m;
      return this._hass && this._hass.themes && this._hass.themes.darkMode ? 'dark' : 'light';
    }

    /* ---- model: everything the card shows, read from Home Assistant ---- */
    _model() {
      const h = this._hass, c = this._cfg;
      const real = stOf(h, c.entity);
      const m = { has: !!c.entity, real, state: 'unavailable', since: NaN, door: 'none', doorSince: NaN, bat: null, text: '' };
      if (real) {
        const s = real.state;
        m.state = s === 'open' ? 'unlocked' : s === 'opening' ? 'unlocking' : CMD_STATES[s] ? s : 'unavailable';
        m.since = Date.parse(real.last_changed);
        m.shown = m.state === s ? real : null;
      }
      const ss = c.state_sensor ? stOf(h, c.state_sensor) : null;
      if (ss) {
        const v = String(ss.state).toLowerCase();
        if (CMD_STATES[v]) { m.state = v; m.since = Date.parse(ss.last_changed); m.shown = null; }
      }
      if (this._pend && !(m.state === this._pend.target)) {
        if (m.state !== 'jammed' && m.state !== 'unavailable') { m.state = this._pend.act === 'lock' ? 'locking' : 'unlocking'; m.shown = null; }
      }
      const d = c.mods.door.on ? stOf(h, c.mods.door.entity) : null;
      if (c.mods.door.on && c.mods.door.entity) {
        m.door = !d || d.state === 'unavailable' || d.state === 'unknown' ? 'na' : d.state === 'on' ? 'open' : 'closed';
        m.doorSince = d ? Date.parse(d.last_changed) : NaN;
      }
      const b = c.mods.battery.on && c.mods.battery.entity ? stOf(h, c.mods.battery.entity) : null;
      if (b) { const n = parseFloat(b.state); m.bat = isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : null; }
      m.canOpen = !!(real && real.attributes && (Number(real.attributes.supported_features) & 1));
      m.codeFmt = !!(real && real.attributes && real.attributes.code_format);
      m.needCode = c.require_code && m.codeFmt;
      return m;
    }
    _view(m) {
      const t = (k, v) => this._t(k, v), st = m.state;
      const word = (k, own) => this._stateText(k, m.shown) || t(own || k);
      const since = Number.isFinite(m.since) ? t('since', { x: this._ago(m.since) }) : '';
      let o = {
        locked: { h: word('locked'), c: 'ok', sub: since },
        unlocked: { h: word('unlocked'), c: 'wr', sub: since },
        unlocking: { h: word('unlocking'), c: 'wr', sub: t('waitConf') },
        locking: { h: word('locking'), c: 'ok', sub: t('waitConf') },
        jammed: { h: word('jammed'), c: 'er', sub: t('jammedSub') },
        unavailable: { h: t('unavail'), c: 'nt', sub: t('unavailSub') }
      }[st];
      o = Object.assign({}, o, { st: st, open: st === 'unlocked' || st === 'unlocking' });
      if (st === 'locked' && m.door === 'open') { o.h = t('doorOpen'); o.c = 'wr'; o.sub = t('doorOpenSub'); }
      if (this._msg) o.sub = t(this._msg);
      return o;
    }
    _doorTile(m) {
      if (m.state === 'unavailable' || m.door === 'na') return ['nt', this._t('unavailShort')];
      return m.door === 'open' ? ['wr', this._t('open')] : ['nt', this._t('closed')];
    }
    _batInfo(m) {
      const b = this._cfg.mods.battery;
      if (m.state === 'unavailable' || m.bat == null) return { c: 'nt', i: 'bat', v: '—' };
      const n = m.bat;
      const crit = Math.min(b.critical, b.low);
      return n <= crit ? { c: 'er', i: 'bata', v: n + '%' } : n <= b.low ? { c: 'wr', i: 'bat50', v: n + '%' } : n <= 50 ? { c: 'ok', i: 'bat50', v: n + '%' } : { c: 'ok', i: 'bat', v: n + '%' };
    }

    _signature() {
      const h = this._hass, c = this._cfg;
      const p = [h && h.themes && h.themes.darkMode ? 'd' : 'l', baseLang(h), this._ev == null ? '-' : this._ev, this._pend ? this._pend.act : '', this._msg, this._flash ? this._flash.t : ''];
      [c.entity, c.state_sensor, c.mods.door.entity, c.mods.battery.entity].forEach((id) => {
        const s = stOf(h, id);
        p.push(id ? id + ':' + (s ? s.state + ':' + s.last_changed + ':' + (s.attributes && s.attributes.code_format ? 'c' : '') : '-') : '');
      });
      return p.join('|');
    }

    /* ---- the events of the day, from the history of the lock ---- */
    _history() {
      const c = this._cfg, h = this._hass;
      if (!c || !h || !c.entity || !c.mods.events.on || this._hb || typeof h.callWS !== 'function') return;
      const s = stOf(h, c.entity);
      const key = c.entity + '|' + (s ? s.state : '-') + '|' + new Date().toDateString();
      if (key === this._hk && Date.now() - this._ha < 300000) return;
      this._hb = true; this._hk = key; this._ha = Date.now();
      const m0 = midnight();
      const done = () => { this._hb = false; this._sig = null; this._render(); };
      try {
        Promise.resolve(h.callWS({ type: 'history/history_during_period', start_time: new Date(m0).toISOString(), end_time: new Date().toISOString(), entity_ids: [c.entity], minimal_response: true, no_attributes: true, significant_changes_only: false })).then((r) => {
          const arr = r && (r[c.entity] || (Array.isArray(r) ? r[0] : null));
          if (!Array.isArray(arr)) { this._ev = null; this._evList = []; done(); return; }
          const list = []; let last = null;
          arr.forEach((e, i) => {
            let state = e.s != null ? e.s : e.state;
            if (state === 'open') state = 'unlocked';
            let ts = e.lc != null ? e.lc : (e.lu != null ? e.lu : null);
            ts = ts != null ? ts * 1000 : Date.parse(e.last_changed || e.last_updated);
            if (state !== 'locked' && state !== 'unlocked') return;
            if (last === null) { last = state; if (i === 0) return; }
            if (state !== last && isFinite(ts)) { list.push({ t: ts, s: state }); }
            last = state;
          });
          this._ev = list.length; this._evList = list; done();
        }, () => { this._ev = null; this._evList = []; done(); });
      } catch (err) { this._hb = false; this._ev = null; }
    }

    /* ---- commands ---- */
    _canCommand(m) { return this._cfg.commands && m.has && !!m.real && m.state !== 'unavailable' && m.state !== 'jammed'; }
    _run(act, code) {
      const c = this._cfg, h = this._hass;
      const target = act === 'lock' ? 'locked' : 'unlocked';
      this._pend = { act: act, target: target, until: Date.now() + PEND_MS };
      this._msg = ''; this._flash = null; this._sig = null; this._render();
      window.clearTimeout(this._timers.pend);
      this._timers.pend = window.setTimeout(() => { if (this._pend && Date.now() >= this._pend.until) this._fail(); }, PEND_MS + 200);
      const data = { entity_id: c.entity };
      if (code) data.code = code;
      let p;
      try { p = Promise.resolve(h.callService('lock', act, data)); } catch (e) { p = Promise.reject(e); }
      return p.then(() => { this._settle(); }, (err) => { this._pend = null; this._sig = null; this._render(); throw err; });
    }
    _request(act) {
      const m = this._model();
      if (!this._canCommand(m)) return;
      if (act === 'lock' && m.door === 'open') return;
      if ((act === 'unlock' || act === 'open') && m.needCode) { this._codeAct = act; this._openCode(); return; }
      this._run(act).catch(() => this._fail());
    }
    _fail() {
      this._pend = null; this._flash = { k: 'err', t: Date.now() }; this._msg = 'failed';
      window.clearTimeout(this._timers.msg);
      this._timers.msg = window.setTimeout(() => { this._msg = ''; this._sig = null; this._render(); }, 4500);
      this._clearFlashLater(); this._sig = null; this._render();
    }
    // Called on every state update: the command is over when the lock reaches the requested state.
    _settle() {
      if (!this._pend || !this._cfg) return;
      const m = (() => { const r = stOf(this._hass, this._cfg.entity); return r ? (r.state === 'open' ? 'unlocked' : r.state) : ''; })();
      if (m === this._pend.target) {
        this._pend = null; this._flash = { k: 'ok', t: Date.now() };
        window.clearTimeout(this._timers.pend); this._clearFlashLater();
        this._hk = ''; this._sig = null;
      } else if (m === 'jammed') { this._fail(); }
    }
    _clearFlashLater() {
      window.clearTimeout(this._timers.fx);
      this._timers.fx = window.setTimeout(() => { this._flash = null; this._sig = null; this._render(); }, 1900);
    }

    /* ---- rendering ---- */
    _controlHTML(m, v) {
      const t = (k) => this._t(k);
      if (m.state === 'unavailable') return '<div class="sl dis" aria-live="polite"><div class="lb">' + t('cmdUnavail') + '</div></div>';
      if (m.state === 'jammed') return '<div class="sl dis"><div class="lb">' + t('manual') + '</div></div>';
      if (!this._cfg.commands) return '<div class="sl dis"><div class="lb">' + ico('shield') + ' ' + t('readOnly') + '</div></div>';
      if (m.state === 'unlocking' || m.state === 'locking') return '<div class="sl dis"><div class="lb">' + t('busy') + '</div></div>';
      const shut = m.door === 'open';
      if (m.state === 'unlocked') return '<button class="bt" data-act="lock"' + (shut ? ' disabled' : '') + '>' + ico('lock') + t(shut ? 'lockDoorOpen' : 'lockBtn') + '</button>';
      // A lock that can "open" (release the latch too): the slider does the full unlock, the third tile unlocks the deadbolt only.
      const cmd = m.canOpen ? 'open' : 'unlock';
      return '<div class="sl" data-act="slide" data-cmd="' + cmd + '"><div class="fl"></div><div class="lb">' + t(m.canOpen ? 'slideOpen' : 'slide') + ' ' + ico('arr') + '</div><button class="hdl" aria-label="' + esc(t(m.canOpen ? 'slideOpenAria' : 'slideAria')) + '">' + ico(m.canOpen ? 'dooro' : 'lock') + '</button></div>';
    }
    _tiles(m) {
      const c = this._cfg, t = (k) => this._t(k), out = [];
      c.order.forEach((k) => {
        if (k === 'door' && c.mods.door.on && c.mods.door.entity) {
          const d = this._doorTile(m);
          out.push('<div class="t c-' + d[0] + '"><div class="ic">' + ico(m.door === 'open' ? 'dooro' : 'door') + '</div><b>' + esc(d[1]) + '</b><span>' + t('tDoor') + '</span></div>');
        } else if (k === 'battery' && c.mods.battery.on && c.mods.battery.entity) {
          const b = this._batInfo(m);
          out.push('<div class="t c-' + b.c + '"><div class="ic">' + ico(b.i) + '</div><b>' + b.v + '</b><span>' + t('tBat') + '</span></div>');
        } else if (k === 'events' && m.canOpen && c.commands) {
          const go = this._canCommand(m) && m.state === 'locked';
          out.push('<button type="button" class="t act c-nt" data-act="bolt"' + (go ? '' : ' disabled') + ' aria-label="' + esc(t('boltAria')) + '"><div class="ic">' + ico('lockopen') + '</div><b>' + t('boltTile') + '</b><span>' + t('boltSub') + '</span></button>');
        } else if (k === 'events' && c.mods.events.on) {
          const n = m.state === 'unavailable' || this._ev == null ? '—' : String(this._ev);
          out.push('<div class="t c-nt" aria-label="' + esc(this._t('evAria', { n: n })) + '"><div class="ic">' + ico('clock') + '</div><b>' + n + '</b><span>' + t('tEvents') + '</span></div>');
        }
      });
      return out.length ? '<div class="tl" style="grid-template-columns:repeat(' + out.length + ',minmax(0,1fr))">' + out.join('') + '</div>' : '';
    }
    _cardHTML(m, v) {
      const c = this._cfg, fx = this._flash && Date.now() - this._flash.t < 1800 ? this._flash.k : '';
      const title = c.title || this._t('defTitle');
      let h = '<div class="hd"><div>' + (c.show_eyebrow && c.eyebrow ? '<div class="eb">' + esc(c.eyebrow) + '</div>' : '') +
        (c.show_title ? '<div class="ti"><span class="tx">' + esc(title) + '</span><b class="dp">.</b></div>' : '') + '</div>' +
        '<button class="rb" data-act="pop" aria-label="' + esc(this._t('detailsAria')) + '">' + ico('chev') + '</button></div>' +
        '<div class="hero"><div class="dial">' + TK + '<div class="knob"><svg class="kc" viewBox="0 0 24 24" aria-hidden="true">' + IC.lock + '</svg><svg class="ko" viewBox="0 0 24 24" aria-hidden="true">' + IC.lockopen + '</svg></div>' +
        (fx ? '<svg class="okr" viewBox="0 0 156 156" aria-hidden="true"><circle cx="78" cy="78" r="77" pathLength="1"/></svg><span class="okb">' + ico(fx === 'ok' ? 'check' : 'x') + '</span>' : '') + '</div>' +
        '<div class="hl" aria-live="polite">' + esc(v.h) + '</div><div class="sb' + (this._msg ? ' er' : '') + '" aria-live="polite">' + esc(v.sub) + '</div></div>';
      h += this._controlHTML(m, v) + this._tiles(m);
      return h;
    }
    _render() {
      if (!this._cfg) return;
      const c = this._cfg;
      this.setAttribute('data-w', c.width);
      if (!c.entity) {
        this._c.innerHTML = '<div class="hc ' + this._mode() + ' c-nt' + (c.width === 'full' ? ' full' : '') + '"><div class="hero"><div class="hl">' + esc(this._t('noEntity')) + '</div><div class="sb">' + esc(this._t('noEntityS')) + '</div></div></div>';
        return;
      }
      const m = this._model(), v = this._view(m), theme = this._mode();
      const el = this._c.firstElementChild, prevOpen = el ? el.classList.contains('opn') : undefined;
      const fx = this._flash && Date.now() - this._flash.t < 1800 ? this._flash.k : '';
      const cls = 'hc ' + theme + ' c-' + v.c + ' st-' + v.st + (c.width === 'full' ? ' full' : '') + (fx ? ' fx-' + fx : '');
      const node = el && el.classList.contains('hc') && el._ok ? el : null;
      const target = node || document.createElement('div');
      target._ok = true;
      target.className = cls + ((prevOpen === undefined ? v.open : prevOpen) ? ' opn' : '');
      target.innerHTML = this._cardHTML(m, v);
      if (!node) { this._c.innerHTML = ''; this._c.appendChild(target); }
      if (prevOpen !== undefined && prevOpen !== v.open) { void target.offsetWidth; target.classList.toggle('opn', v.open); }
      this._bind(target);
      this._theme = theme;
      if (this._popup) this._drawPop();
    }
    _bind(el) {
      const sl = el.querySelector('[data-act="slide"]');
      if (!sl) return;
      const h = sl.querySelector('.hdl'), f = sl.querySelector('.fl'), lb = sl.querySelector('.lb');
      let sx = 0, x = 0, drag = false, max = 0;
      const set = (v) => { x = Math.max(0, Math.min(max, v)); h.style.transform = 'translateX(' + x + 'px)'; f.style.width = (x + 50) + 'px'; lb.style.opacity = String(1 - x / Math.max(1, max) * 1.2); };
      const reset = () => { h.style.transition = 'transform .25s'; f.style.transition = 'width .25s'; set(0); lb.style.opacity = '1'; };
      h.addEventListener('pointerdown', (e) => { drag = true; sx = e.clientX - x; max = sl.clientWidth - h.offsetWidth - 10; h.setPointerCapture(e.pointerId); h.style.transition = 'none'; f.style.transition = 'none'; });
      h.addEventListener('pointermove', (e) => { if (drag) set(e.clientX - sx); });
      const end = () => {
        if (!drag) return;
        drag = false; h.style.transition = 'transform .25s'; f.style.transition = 'width .25s';
        if (x >= max * 0.9) { set(max); this._request(sl.dataset.cmd || 'unlock'); window.setTimeout(() => { if (this._keypad) reset(); }, 0); } else set(0);
      };
      h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
      h.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._request(sl.dataset.cmd || 'unlock'); } });
      this._resetSlider = reset;
    }
    _click(e) {
      const a = e.target.closest('[data-act]');
      if (a && a.dataset.act === 'lock') { this._request('lock'); return; }
      if (a && a.dataset.act === 'bolt') { this._request('unlock'); return; }
      if (a && a.dataset.act === 'pop') { this._openPop(); return; }
      if (e.target === this._ov || e.target.closest('#xb')) { this._closePop(); return; }
      if (e.target === this._sh || e.target.closest('#shNo')) { this._closeCode(true); return; }
      const k = e.target.closest('[data-k]');
      if (k) { this._press(k.dataset.k); return; }
      if (e.target.closest('#shGo')) this._submit();
    }

    /* ---- popup ---- */
    _row(i, n, v, sub) { return '<div class="r"><div class="ic">' + ico(i, 'x').replace('class="x"', '') + '</div><div class="nm">' + n + (sub ? '<small>' + sub + '</small>' : '') + '</div><div class="vl">' + v + '</div></div>'; }
    _popHTML() {
      const c = this._cfg, m = this._model(), v = this._view(m), t = (k) => this._t(k), un = m.state === 'unavailable';
      const r = (i, n, val, sub) => this._row(i, n, val, sub);
      const lastTxt = un ? '—' : this._when(m.since);
      const stateTxt = m.state === 'locked' ? (this._stateText('locked', m.shown) || t('lockedS')) : v.h;
      let h = '<div class="pop"><div class="ph"><h3 id="ovT">' + t('popTitle') + '</h3><button class="xb" id="xb" aria-label="' + esc(t('close')) + '"><svg viewBox="0 0 24 24">' + IC.x + '</svg></button></div><div class="pb">' +
        '<div class="g c-' + v.c + '"><div class="gh"><em>' + t('gLock') + '</em><span class="pill">' + esc(v.h) + '</span></div>' +
        r('lock', t('state'), esc(stateTxt)) + r('clock', t('lastChange'), esc(lastTxt)) +
        r('shield', t('commands'), c.commands ? t('enabled') : t('readOnlyS')) +
        r('key', t('codeUnlock'), m.needCode ? t('codeEvery') : t('notRequired')) +
        (c.mods.events.on ? r('clock', t('eventsToday'), un || this._ev == null ? '—' : String(this._ev)) : '') + '</div>';
      if (c.mods.door.on && c.mods.door.entity) {
        const d = this._doorTile(m);
        h += '<div class="g c-' + d[0] + '"><div class="gh"><em>' + t('gDoor') + '</em><span class="pill">' + esc(d[1]) + '</span></div>' +
          r('door', t('doorSensor'), esc(d[1])) + r('clock', t('lastChange'), m.door === 'na' ? '—' : esc(this._when(m.doorSince))) + '</div>';
      }
      const b = this._batInfo(m);
      h += '<div class="g c-' + (un ? 'nt' : 'ok') + '"><div class="gh"><em>' + t('gDevice') + '</em><span class="pill">' + (un ? t('unavail') : t('online')) + '</span></div>' +
        (c.mods.battery.on && c.mods.battery.entity ? r(b.i, t('battery'), m.bat == null || un ? '—' : '<span class="bar2 c-' + b.c + '"><i style="width:' + m.bat + '%"></i></span>' + m.bat + '%') : '') +
        r('wifi', t('connection'), un ? t('noReply') : t('online')) + '</div>';
      if (c.mods.events.on && this._evList.length) {
        h += '<div class="g c-nt"><div class="gh"><em>' + t('lastEvents') + '</em></div>' +
          this._evList.slice(-4).reverse().map((e) => r(e.s === 'locked' ? 'lock' : 'lockopen', e.s === 'locked' ? t('lockedS') : t('unlocked'), esc(this._time(e.t)), '')).join('') + '</div>';
      }
      return h + '</div></div>';
    }
    _drawPop() {
      this._ov.className = 'ov on ' + this._mode();
      this._ov.setAttribute('role', 'dialog'); this._ov.setAttribute('aria-modal', 'true'); this._ov.setAttribute('aria-labelledby', 'ovT');
      this._ov.innerHTML = this._popHTML();
    }
    _openPop() {
      this._popup = true; this._drawPop();
      document.addEventListener('keydown', this._onKey, true);
      const x = this.shadowRoot.getElementById('xb'); if (x) x.focus();
    }
    _closePop() {
      this._popup = false; this._ov.className = 'ov'; this._ov.innerHTML = '';
      if (!this._keypad) document.removeEventListener('keydown', this._onKey, true);
    }

    /* ---- code keypad: the code is typed every time and is never stored ---- */
    _openCode() { this._keypad = true; this._code = ''; this._err = ''; this._shake = false; this._kbusy = false; this._drawCode(); document.addEventListener('keydown', this._onKey, true); }
    _drawCode() {
      const t = (k) => this._t(k), m = this._model(), v = this._view(m), n = Math.max(4, this._code.length);
      const kb = (k) => '<button type="button" data-k="' + k + '" aria-label="' + k + '"><b>' + k + '</b></button>';
      const keys = '<div class="keys">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(kb).join('') + '<span></span>' + kb(0) + '<button type="button" class="bk" data-k="del" aria-label="' + esc(t('delAria')) + '" ' + (this._code ? '' : 'disabled') + '><svg viewBox="0 0 24 24">' + IC.back + '</svg></button></div>';
      const title = this._cfg.title || t('defTitle');
      this._sh.className = 'sh on ' + this._mode();
      this._sh.setAttribute('role', 'dialog'); this._sh.setAttribute('aria-modal', 'true'); this._sh.setAttribute('aria-labelledby', 'shT');
      this._sh.innerHTML = '<div class="kdlg"><div class="kmh"><h2 id="shT">' + esc(t('kTitle')) + '</h2><button type="button" class="kx" id="shNo" aria-label="' + esc(t('close')) + '"><svg viewBox="0 0 24 24">' + IC.x + '</svg></button></div><div class="kmb">' +
        '<div class="abig"><div class="orb"><svg viewBox="0 0 24 24">' + IC.lock + '</svg></div><div><div class="vt">' + esc(v.h) + '</div><div class="vs">' + esc(title) + '</div></div></div>' +
        '<div class="ast"><div><span>' + t('now') + '</span><b>' + esc(m.state === 'locked' ? (this._stateText('locked', m.shown) || t('lockedS')) : v.h) + '</b></div><div><span>' + t('after') + '</span><b>' + esc(this._stateText('unlocked', null) || t('unlocked')) + '</b></div></div>' +
        '<div class="klbl">' + t('codeReq') + '</div><div class="dotrow"><div class="dts' + (this._shake ? ' shake' : '') + '">' + Array.from({ length: n }, (_, i) => '<i class="' + (i < this._code.length ? 'f' : '') + '"></i>').join('') + '</div></div>' +
        '<div class="err" role="alert">' + (this._err ? esc(t(this._err)) : '') + '</div>' + keys +
        '<button type="button" class="acta" id="shGo" ' + (this._code && !this._kbusy ? '' : 'disabled') + '>' + esc(t(this._codeAct === 'open' ? 'openBtn' : 'unlockBtn')) + '</button>' +
        '<div class="knote">' + t('note') + '</div></div></div>';
    }
    _press(k) {
      if (this._kbusy) return;
      if (k === 'del') this._code = this._code.slice(0, -1); else if (this._code.length < 12) this._code += k;
      this._err = ''; this._shake = false; this._drawCode();
    }
    _submit() {
      if (!this._code || this._kbusy) return;
      const code = this._code; this._kbusy = true; this._drawCode();
      this._run(this._codeAct || 'unlock', code).then(() => { this._closeCode(false); }, () => {
        this._kbusy = false; this._err = 'wrongCode'; this._code = ''; this._shake = true; this._drawCode(); this._shake = false;
      });
      this._code = '';
    }
    _closeCode(cancelled) {
      this._codeAct = '';
      this._keypad = false; this._code = ''; this._err = ''; this._kbusy = false;
      this._sh.className = 'sh'; this._sh.innerHTML = '';
      if (cancelled && this._resetSlider) this._resetSlider();
      if (!this._popup) document.removeEventListener('keydown', this._onKey, true);
    }
    _key(e) {
      if (this._keypad) {
        if (/^[0-9]$/.test(e.key)) { e.preventDefault(); e.stopPropagation(); this._press(e.key); }
        else if (e.key === 'Backspace') { e.preventDefault(); e.stopPropagation(); this._press('del'); }
        else if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); this._submit(); }
        else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this._closeCode(true); }
        return;
      }
      if (e.key === 'Escape' && this._popup) { e.preventDefault(); e.stopPropagation(); this._closePop(); }
    }
  }

  /* ----------------------------------------------------------- the editor */
  class DoorLatchCardEditor extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._config = {}; this._hass = null; this._tab = 'serratura'; this._last = ''; this._built = false;
      this.shadowRoot.addEventListener('click', (e) => this._click(e));
      this.shadowRoot.addEventListener('change', (e) => this._change(e));
      this.shadowRoot.addEventListener('input', (e) => this._input(e));
    }
    setConfig(config) {
      const j = JSON.stringify(config || {});
      if (this._built && j === this._last) return;
      this._config = clone(config || {}); this._last = j; this._render();
    }
    set hass(h) {
      const first = !this._hass; this._hass = h;
      if (first && this._built) this._render();
      else this.shadowRoot.querySelectorAll('ha-selector').forEach((s) => { s.hass = h; });
    }
    get hass() { return this._hass; }
    _t(k, v) {
      const l = pickLang('auto', this._hass);
      let s = (ETR[l] && ETR[l][k]) || ETR.en[k] || k;
      if (v) for (const x in v) s = s.replace('{' + x + '}', v[x]);
      return s;
    }
    _emit(cfg) {
      this._config = cfg; this._last = JSON.stringify(cfg);
      this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: cfg }, bubbles: true, composed: true }));
    }
    _norm() { try { return normalizeConfig(this._config); } catch (e) { return normalizeConfig({}); } }
    _set(key, value) { const c = clone(this._config); if (value === undefined || value === '') delete c[key]; else c[key] = value; this._emit(c); }
    _setMod(k, patch) {
      const n = this._norm(), c = clone(this._config);
      c.mods = c.mods || {};
      c.mods[k] = Object.assign({}, n.mods[k], c.mods[k] || {}, patch);
      c.order = n.order;
      this._emit(c);
    }
    _field(label, inner, help) { return '<div class="field"><div class="label">' + esc(label) + '</div>' + inner + (help ? '<div class="tiny">' + esc(help) + '</div>' : '') + '</div>'; }
    _check(id, label, help, on) { return '<div class="row"><label for="' + id + '">' + esc(label) + (help ? '<div class="muted">' + esc(help) + '</div>' : '') + '</label><input type="checkbox" id="' + id + '" ' + (on ? 'checked' : '') + '></div>'; }
    _err(msg) { return '<div class="errt" role="alert">' + esc(msg) + '</div>'; }

    _serratura(n) {
      const t = (k) => this._t(k);
      return '<div class="heading">' + t('tSer') + '</div><div class="desc">' + esc(t('serDesc')) + '</div>' +
        this._field(t('lblLock'), '<div data-slot="entity"></div>', t('tipLock')) + (n.entity ? '' : this._err(t('eEntity'))) +
        this._field(t('lblState') + ' ' + t('optional'), '<div data-slot="state_sensor"></div>', t('tipState')) +
        this._check('commands', t('cmd'), t('cmdH'), n.commands) +
        this._check('require_code', t('code'), t('codeH'), n.require_code);
    }
    _moduli(n) {
      const t = (k, v) => this._t(k, v);
      const info = { door: ['mDoor', 'mDoorH', 'mDoorTip'], battery: ['mBat', 'mBatH', 'mBatTip'], events: ['mEv', 'mEvH', ''] };
      let h = '<div class="heading">' + t('tMod') + '</div><div class="desc">' + esc(t('modDesc')) + '</div>';
      n.order.forEach((k, i) => {
        const m = n.mods[k], nm = t(info[k][0]);
        h += '<div class="mod"><div class="mh"><div class="nm">' + esc(nm) + '</div><div class="ctl"><button type="button" class="action" data-move="' + i + ':-1" aria-label="' + esc(t('up', { x: nm })) + '" ' + (i === 0 ? 'disabled' : '') + '>↑</button><button type="button" class="action" data-move="' + i + ':1" aria-label="' + esc(t('down', { x: nm })) + '" ' + (i === n.order.length - 1 ? 'disabled' : '') + '>↓</button></div></div>' +
          '<div class="muted" style="margin-top:6px">' + esc(t(info[k][1])) + '</div>' +
          '<div class="mb"><div class="chk"><input type="checkbox" id="on-' + k + '" data-on="' + k + '" ' + (m.on ? 'checked' : '') + '><label for="on-' + k + '">' + esc(t('active')) + '</label></div>' +
          (k !== 'events' ? '<div data-slot="mod-' + k + '"></div>' : '') + (k === 'battery' ? this._thr(m) : '') + '</div></div>';
      });
      return h;
    }
    _thr(m) {
      const t = (k) => this._t(k);
      const lowBad = !(m.low >= 1 && m.low <= 100), critBad = !(m.critical >= 0 && m.critical <= 100), order = !lowBad && !critBad && m.critical >= m.low;
      return '<div class="field"><div class="label">' + t('thr') + '</div><div class="two"><div><div class="muted">' + t('low') + '</div><input class="input" type="number" min="1" max="100" id="low" value="' + esc(m.low) + '"></div>' +
        '<div><div class="muted">' + t('crit') + '</div><input class="input" type="number" min="0" max="100" id="critical" value="' + esc(m.critical) + '"></div></div>' +
        (lowBad ? this._err(t('eLow')) : critBad ? this._err(t('eCrit')) : order ? this._err(t('eCritLow')) : '<div class="tiny">' + t('thrDef') + '</div>') + '</div>';
    }
    _aspetto(n) {
      const t = (k) => this._t(k);
      return '<div class="heading">' + t('tAsp') + '</div>' +
        this._field(t('eyebrow'), '<input class="input" type="text" id="eyebrow" maxlength="60" value="' + esc(n.eyebrow) + '">') +
        this._field(t('title'), '<input class="input" type="text" id="title" maxlength="60" value="' + esc(n.title) + '">', t('titleH')) +
        this._check('show-eyebrow', t('showEyebrow'), '', n.show_eyebrow) +
        this._check('show-title', t('showTitle'), '', n.show_title) +
        this._check('cw', t('full'), t('fullH'), n.width === 'full') +
        this._field(t('theme'), '<select class="input" id="theme">' + [['auto', t('thAuto')], ['light', t('thLight')], ['dark', t('thDark')]].map((o) => '<option value="' + o[0] + '" ' + (n.theme_mode === o[0] ? 'selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>') +
        this._field(t('lang'), '<select class="input" id="language">' + [['auto', t('langAuto')]].concat(LANGS).map((o) => '<option value="' + o[0] + '" ' + (n.language === o[0] ? 'selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>', t('langH'));
    }
    _mount(slot, selector, value, cb) {
      const el = document.createElement('ha-selector');
      el.hass = this._hass; el.selector = selector; el.value = value; el.required = false;
      el.addEventListener('value-changed', (ev) => { ev.stopPropagation(); cb(ev.detail ? ev.detail.value : undefined); });
      slot.appendChild(el);
    }
    _render() {
      const n = this._norm(), tab = this._tab;
      const act = this.shadowRoot.activeElement ? this.shadowRoot.activeElement.id : '';
      this.shadowRoot.innerHTML = '<style>' + EDITOR_CSS + '</style><div class="ed"><div class="tabs" role="group">' +
        [['serratura', this._t('tSer')], ['moduli', this._t('tMod')], ['aspetto', this._t('tAsp')]].map((a) => '<button type="button" class="tab" data-tab="' + a[0] + '" id="t-' + a[0] + '" aria-pressed="' + (tab === a[0]) + '">' + esc(a[1]) + '</button>').join('') + '</div>' +
        (tab === 'serratura' ? this._serratura(n) : tab === 'moduli' ? this._moduli(n) : this._aspetto(n)) + '</div>';
      this._built = true;
      const sl = (name) => this.shadowRoot.querySelector('[data-slot="' + name + '"]');
      if (sl('entity')) this._mount(sl('entity'), { entity: { domain: 'lock' } }, n.entity || undefined, (v) => { this._set('entity', v || undefined); this._render(); });
      if (sl('state_sensor')) this._mount(sl('state_sensor'), { entity: { domain: 'sensor' } }, n.state_sensor || undefined, (v) => this._set('state_sensor', v || undefined));
      if (sl('mod-door')) this._mount(sl('mod-door'), { entity: { filter: [{ domain: 'binary_sensor', device_class: ['door', 'window', 'opening', 'garage_door'] }] } }, n.mods.door.entity || undefined, (v) => this._setMod('door', { entity: v || '' }));
      if (sl('mod-battery')) this._mount(sl('mod-battery'), { entity: { filter: [{ domain: 'sensor', device_class: 'battery' }] } }, n.mods.battery.entity || undefined, (v) => this._setMod('battery', { entity: v || '' }));
      if (act) { const el = this.shadowRoot.getElementById(act); if (el && !el.disabled) el.focus({ preventScroll: true }); }
    }
    _click(e) {
      let t = e.target.closest('[data-tab]'); if (t) { this._tab = t.dataset.tab; this._render(); return; }
      t = e.target.closest('[data-move]');
      if (t) {
        const a = t.dataset.move.split(':').map(Number), i = a[0], j = i + a[1], n = this._norm();
        if (j < 0 || j >= n.order.length) return;
        const o = n.order.slice(), tmp = o[i]; o[i] = o[j]; o[j] = tmp;
        const c = clone(this._config); c.order = o; this._emit(c); this._render();
      }
    }
    _change(e) {
      const el = e.target, c = clone(this._config);
      if (el.dataset && el.dataset.on) { this._setMod(el.dataset.on, { on: el.checked }); return; }
      const map = { 'show-eyebrow': 'show_eyebrow', 'show-title': 'show_title', commands: 'commands', require_code: 'require_code' };
      if (map[el.id]) { c[map[el.id]] = el.checked; this._emit(c); return; }
      if (el.id === 'cw') { c.width = el.checked ? 'full' : 'center'; this._emit(c); return; }
      if (el.id === 'theme') { c.theme_mode = el.value; this._emit(c); return; }
      if (el.id === 'language') { c.language = el.value; this._emit(c); }
    }
    _input(e) {
      const el = e.target;
      if (el.id === 'eyebrow') this._set('eyebrow', el.value);
      else if (el.id === 'title') this._set('title', el.value);
      else if (el.id === 'low' || el.id === 'critical') { this._setMod('battery', { [el.id]: el.value === '' ? NaN : Number(el.value) }); }
    }
  }

  if (!customElements.get(TAG)) customElements.define(TAG, DoorLatchCard);
  if (!customElements.get(EDITOR_TAG)) customElements.define(EDITOR_TAG, DoorLatchCardEditor);
  window.customCards = window.customCards || [];
  if (!window.customCards.some((c) => c.type === TAG)) {
    window.customCards.push({ type: TAG, name: 'Door Latch Card', description: 'Modern card to unlock and lock a door with a lock entity: animated state, battery, optional door sensor, events of the day, optional code keypad.', preview: false });
  }
  console.info('%c DOOR-LATCH-CARD %c ' + VERSION + ' ', 'color:#fff;background:#0a7156;font-weight:700', 'color:#0a7156;background:#fff');
})();
