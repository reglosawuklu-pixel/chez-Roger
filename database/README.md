# Assistant Chez Roger et base de données

## Ce qui fonctionne dans cette première version

Le widget du site répond à des questions déterminées sur les horaires, l’adresse, la carte et les commandes. Il guide aussi le client pour préparer une demande de commande ou de réservation, puis ouvre WhatsApp avec le message prérempli. Le client doit encore envoyer ce message et l’équipe doit confirmer la demande.

Cette version ne contacte aucune API d’IA, ne se connecte à aucun serveur et ne sauvegarde pas les messages ni les données saisies. Les réponses doivent rester prudentes : la disponibilité des plats et la possibilité de livraison sont confirmées par l’équipe.

## Architecture de production proposée

1. Le site React reste l’interface client.
2. Un service API séparé (Node.js) reçoit et valide les commandes et réservations.
3. Ce service seul se connecte au MySQL géré dans le cloud. La base ne doit jamais être appelée directement depuis le navigateur.
4. Le schéma de départ est dans `schema.sql`. Il garde les données nécessaires aux commandes, aux articles et aux réservations, sans historique de chat.
5. MySQL Workbench sert à concevoir et administrer la base et à s’y connecter ; il ne fournit pas le serveur MySQL. En production, le serveur reste hébergé dans le cloud.

## Règles à mettre en place avant la mise en ligne

- Garder les mots de passe et clés dans des variables d’environnement côté API, jamais dans le code React ni dans Git.
- Autoriser les connexions à MySQL uniquement depuis le serveur API et le poste administrateur prévu ; imposer TLS.
- Créer un compte MySQL applicatif limité aux tables de Chez Roger, distinct du compte administrateur.
- Utiliser un pool de connexions borné, des requêtes préparées, des transactions pour commande + lignes de commande, et les clés d’idempotence prévues pour éviter les doublons lors d’un nouvel envoi.
- Définir avec Chez Roger les règles de conservation et suppression des coordonnées ; limiter les données demandées et éviter de journaliser leur contenu.
- Activer sauvegardes et restauration ponctuelle, alertes, suivi des erreurs et procédure de restauration testée avant la production.
- Mesurer le trafic et la charge réelle avant d’augmenter les ressources ou d’ajouter cache, files de tâches ou réplicas.

## Préparation avec MySQL Workbench

1. Installer MySQL Workbench Community et se connecter à un serveur MySQL de développement.
2. Ouvrir `schema.sql`, vérifier le schéma, puis l’exécuter sur ce serveur de développement.
3. Ne pas mettre de vraies coordonnées clients dans une base locale de test.
4. Quand l’hébergeur sera choisi, créer la base gérée et une connexion Workbench protégée par TLS et par liste d’accès. Ne pas exposer le mot de passe dans une capture d’écran ou un dépôt.

Le choix du fournisseur, la création du serveur API, les identifiants de base, les sauvegardes de production et le déploiement restent à configurer avant de pouvoir stocker des données réelles.
