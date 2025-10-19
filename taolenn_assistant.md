# Taolenn assistant – PyQt5

Application PyQt5 pour aider à rédiger des e-mails à partir d'un **contexte** et de **ce que tu veux dire**,
avec **styles** configurables via des fichiers YAML dans `styles/`. Intégration possible à Outlook pour importer
le message sélectionné et pour créer un nouveau mail ou répondre directement.

## Installation (Windows)

1. Double-clique `scripts\install.bat`
   - Crée un environnement virtuel `.venv`
   - Installe les dépendances
   - Copie `.env.example` vers `.env`
2. Ouvre `.env` et renseigne `OPENAI_API_KEY` (si ce fichier existe, sa valeur l'emporte sur toute autre clé déjà enregistrée).
3. Lance `scripts\run.bat` pour exécuter l’application.

> Par défaut, `install.bat` essaie d’utiliser Python à l’emplacement :  
> `C:\Users\33679\AppData\Local\Programs\Python\Python39\python.exe`  
> et bascule sur `python` du PATH si non trouvé.

## Fonctionnalités

- Zone **Contexte** : colle un mail ou importe depuis Outlook (sélection).
- Zone **Ce que je veux dire** : écris le fond du message à transmettre.
- Onglet **Reformuler** : réécrit ou traduit un texte, avec sélection de la langue cible (français, anglais, italien, espagnol, chinois).
- Onglet **Conseil** : fournit des conseils professionnels personnalisés selon le profil utilisateur, avec choix de la langue de sortie.
- Onglet **Chatbot** : chat multi-tour avec mémorisation de l'historique, possibilité d'enregistrer/ouvrir une conversation et réponses en Markdown. Un bouton **Nouveau** remet la discussion à zéro et les fichiers sont stockés dans `chats/`.
- Onglet **Projets** : organise des projets composés de tâches et de sous‑tâches, chaque sous‑tâche disposant d’une durée théorique. Les durées sont additionnées pour chaque tâche et des commentaires peuvent être ajoutés. Chaque ligne propose des actions contextuelles (vers le planning du jour, ouverture d’un CR de réunion prérempli ou mise en attente temporaire d’un élément).
- Panneau **Ressources** : recherche par mots-clés les liens/chemins stockés dans la base, les associe aux projets, tâches et sous-tâches sélectionnés et ouvre les destinations d’un double-clic. Un bouton **Dossier** ouvre directement le répertoire contenant un fichier local lié. La boîte **Base de données** propose des boutons *Fichier*, *Dossier* ou *Coller chemin/URL* pour retrouver rapidement un emplacement local ou un lien web depuis le presse-papiers.
- Chaque tâche dispose désormais des colonnes **Début** et **Échéance** (date butoir) synchronisées automatiquement entre l’onglet Projets et l’onglet Tâches du jour ; les sous-tâches héritent de l’échéance et apparaissent comme points dans la vue Gantt.
- Onglet **Diagramme de Gantt** : visualise la chronologie des projets avec un cadrage automatique sur le lundi de la semaine en cours, affiche les sous-tâches en points colorés (y compris archivées) et superpose les périodes de congés. Un clic sur un projet le déploie pour révéler ses tâches et sous-tâches ; un double‑clic sur un projet ouvre sa fiche complète dans la base de données, et un double‑clic sur une tâche ou une sous‑tâche sélectionne l’élément dans l’onglet Projets tout en proposant la mise à jour des dates (début/fin ou échéance). L’échelle temporelle affiche des traits hebdomadaires et mensuels ainsi que les mois/années correspondants pour mieux se repérer.
- Une barre rouge verticale marque la date du jour pour visualiser rapidement l’avancement dans la chronologie.
- Les statuts utilisent un code couleur commun (attente, en cours, terminé, **récurrent**) et s’appliquent aussi bien aux projets qu’aux tâches du jour. Une tâche marquée récurrente est historisée sans jamais être retirée du projet, même si elle est supprimée du planning quotidien.
- Les durées sont exprimées en heures (`h`) avec possibilité de décimales.
- Une tâche, sous‑tâche ou projet terminé est déplacé en haut de liste puis consignée dans l’onglet **Historique** visible dès le lendemain et retirée de l’onglet **Projets**.
- Onglet **Tâches du jour** : affiche le projet d'origine, les durées, les commentaires et les échéances des tâches/sous-tâches ; un bouton **Archiver** par ligne propose soit de supprimer la tâche du projet, soit de simplement la consigner dans l'historique tout en la retirant du planning. Chaque ligne de l’onglet **Projets** dispose d’une icône **Vers jour** pour envoyer rapidement l’élément sélectionné dans le planning quotidien, et tu peux retirer une tâche du planning avec **Supprimer** sans modifier le statut ou les commentaires conservés dans Projets. Les éléments marqués **Récurrent** sont toujours historisés sans être supprimés du projet pour pouvoir être réutilisés le lendemain.
- Le bouton **Modèles** de l’onglet Projets enregistre une tâche ou une sous-tâche (avec ses ressources liées) pour les réutiliser ultérieurement dans n’importe quel projet.
- Onglet **Attentes** : consigne les demandes adressées à d’autres personnes en les reliant à un projet/tâche/sous-tâche, permet de choisir l’intervenant depuis la base (ou d’en ajouter un à la volée), renseigne la date de demande, la deadline et une relance par défaut à J+7, puis colore les lignes selon l’urgence avant échéance. Une section « Mises en attente » permet de réactiver en un clic un projet, une tâche ou une sous-tâche préalablement mise de côté.
- Onglet **Données** : gestion des informations personnelles ou d'entreprise sous forme de paires clé/valeur, enregistrées automatiquement.
- Onglet **Historique** : consulte les éléments achevés les jours précédents avec un total d'heures par semaine complète et pour la semaine en cours. Les entrées issues des tâches achevées peuvent être supprimées à la demande, les totaux se recalculant automatiquement. Le bouton « Archiver une sous-tâche… » permet aussi d'ajouter une sous-tâche terminée directement depuis ce panneau en renseignant durée et commentaire ; l'élément est retiré du projet et consigné immédiatement. Le bouton « Créer & archiver » présent dans le même dialogue crée une sous-tâche ad hoc puis l'ajoute à l'historique sans passer par l'onglet Projets.
- Onglet **Pomodoro** : configure les durées de travail/pause, lance le minuteur et suis l’historique des cycles ; une boîte de dialogue s’affiche en premier plan lorsque la session se termine, quelle que soit la fenêtre actuellement ouverte.
- Profil utilisateur et données générales persistantes pour contextualiser toutes les requêtes.
- Sélecteur **Police** : ajuste la taille de l'interface via une liste déroulante, valeur conservée entre les sessions.
- **Style** : sélection via une liste déroulante (chargée depuis `styles/*.yaml`). Le style par défaut est `pro_fr` ("Français pro") placé en tête de liste ; la sélection est mémorisée entre les sessions. Tu peux éditer ou créer de nouveaux styles.
- Choix du **modèle** sur la barre d'outils : radio‑boutons *Thinking* (`gpt-5-nano`, `gpt-5-mini`, `gpt-5`) ou *Fast* (`gpt-4.1-mini`, sélectionné par défaut).
- Combo **Projet** dans la barre supérieure : sélectionne le projet actif pour contextualiser automatiquement les mails, reformulations, conseils et conversations du chatbot.
- **Rédiger** : propose d’abord des **questions de clarification** (si nécessaire, option mémorisée), puis génère l’objet + le corps.
- Fenêtre de résultat : copier le corps, créer **un nouveau mail Outlook** (avec l’objet), ou **répondre** au message sélectionné.
- Filtrage simple de sorties : évite les mots proscrits en français comme “crucial” et “insight”.
- Menu **Aide** : affiche une documentation détaillée et les conditions générales d'utilisation.
- Menu **Fichier** : ouvrir un dossier de données, enregistrer ou « Enregistrer sous » toutes les informations utilisateur.
- Menu **Options** : éditer le profil utilisateur (`data/user_profile.json`) ou les **données générales** de l'entreprise (`data/general_data.json`), ouvrir/éditer/créer des styles, changer la clé API ou consulter la **facturation** (tokens et coûts estimés).
- Menu **Base de données** : gère une base contacts/projets (descriptions, chef de projet, sociétés avec adresse postale et coordonnées, intervenants **et ressources partagées**) réutilisée dans tous les appels aux modèles. La table *Intervenants* dispose désormais d'une colonne **Prénom** pour distinguer les noms et d'une barre de recherche pour filtrer rapidement les personnes à associer à un projet. Chaque intervenant peut être rattaché à plusieurs sociétés, et chaque projet peut référencer plusieurs sociétés clientes. Une boîte « CR de réunion » permet aussi de consigner projet/tâche, participants (filtrés sur ceux du projet), résumé riche (gras, italique, titres, taille de police) et actions via un tableau pouvant lier ou créer des tâches/sous-tâches, avec une durée automatiquement reportée dans l'historique. La fenêtre peut être agrandie via le bouton système de maximisation (entre `?` et `X`) pour travailler en plein écran.
- La boîte « Notes… » (menu **Base de données**) enregistre des notes Markdown qui peuvent rester générales (aucune association) ou être liées à un projet, une tâche, une sous-tâche et/ou des intervenants. Une liste déroulante permet de classer chaque note (Technique, Stratégique, Mode opératoire, …) et d’ajouter de nouveaux types persistants pour les réutiliser. L’éditeur offre un aperçu Markdown en temps réel, un bouton **Associer à un projet** pour activer/désactiver les liaisons et l’action **Mettre en forme (IA)** qui reformate la note selon le contexte (participants, autres notes liées, informations projet). Utilise le bouton système de maximisation (entre `?` et `X`) pour afficher l’éditeur et l’aperçu en plein écran. Les équations LaTeX sont rendues localement via Matplotlib pour un affichage propre sans dépendre de KaTeX. Les notes enregistrées alimentent automatiquement les prompts des mails, conseils, reformulations et du chatbot.
- Les projets ajoutés via la base de données sont automatiquement proposés dans l’onglet **Projets**, et chaque enregistrement du tableau dispose d’une colonne Description synchronisée avec l’onglet.
- Les projets créés ou renommés dans l’onglet **Projets** sont automatiquement synchronisés avec la base de données pour rester disponibles dans les menus contextuels.
- Suivi de **facturation** : consommation de tokens enregistrée par modèle avec remise à zéro automatique chaque 27 du mois (tarifs configurables dans `pricing.csv`).
- Onglet **Chatbot** : en plus du dialogue libre, un bouton **Ajouter aux projets** demande à l’IA une liste structurée de tâches/sous-tâches et les insère dans l’onglet Projets (statut "En attente").
- Dossier `icons/` : ajoute des PNG pour personnaliser les boutons (voir `icons/README.md`). Un symbole ⚠ s'affiche si l'icône est absente. `logo.png` et `logo.ico` sont utilisés pour l'icône de l'application. Le script `python check_icons.py` (ou `check_icons.bat` sous Windows) vérifie rapidement quels fichiers manquent et rappelle leur description.
- Jeu de données d'exemple : le dossier `data/` est pré-rempli avec un profil utilisateur, des projets hiérarchisés, des tâches du jour, des attentes, des notes, des comptes rendus et un historique pour tester immédiatement l'assistant.

## Structure

```
email-assistant-pyqt5/
├─ app.py
├─ openai_client.py
├─ outlook_integration.py
├─ config.py
├─ requirements.txt
├─ .env.example
├─ .env
├─ data/
│  ├─ user_profile.json
│  ├─ general_data.json
│  ├─ projects.json
│  ├─ daily_tasks.json
│  ├─ expectations.json
│  ├─ completed.json
│  ├─ database.json
│  ├─ task_templates.json
│  ├─ vacations.json
│  └─ billing.json
├─ chats/
├─ pricing.csv
├─ styles/
│  ├─ pro_fr.yaml
│  ├─ academic-en.yaml
│  └─ whatsapp-vouvoyant.yaml
└─ scripts/
   ├─ install.bat
   └─ run.bat
```

## Modèles et API

- Modèle par défaut : `gpt-4.1-mini` (modifie dans `.env`).
- Variables d’environnement : `OPENAI_API_KEY`, `OPENAI_BASE_URL` (optionnel), `OPENAI_MODEL`, `DEFAULT_STYLE`, `OUTLOOK_ENABLED`, `FORCE_LANGUAGE`, `TIMEOUT_S`.

## Notes Outlook

- L’intégration Outlook fonctionne uniquement sous Windows avec Outlook desktop.
- Assure-toi d’avoir un message **sélectionné** si tu veux importer le contexte ou répondre.

## Générer un exécutable

- Lancer `build_exe_no_env.bat` crée un dossier `dist\TaolennAssistant` contenant `TaolennAssistant.exe` (utilise `icons\logo.ico` comme icône si disponible).
- Windows peut afficher un avertissement SmartScreen car l’exécutable n’est pas signé ; clique sur « Informations complémentaires » puis « Exécuter quand même » ou signe l’application pour la distribuer.
- Exécute `TaolennAssistant.exe` depuis un dossier local auquel tu as accès afin d’éviter les erreurs Windows du type « ne parvient pas à accéder au périphérique ».
- Le script copie automatiquement le dossier `styles`, les fichiers du dossier `icons` (sans sous-dossiers), le dossier `data`, `pricing.csv` ainsi que le dossier `chats` dans le dossier de sortie pour préserver les ressources et les préférences utilisateur.

## Licence

MIT (fichiers fournis à titre d’exemple). Utilisation à tes risques.
