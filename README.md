Ce projet est réalisé dans le cadre de l'ECF n°1 portant sur les compétences en développement Front-End de la formation
de développeur Web et Web mobile 2025-2026. Nommé "Horoscope Oracle du Jour", il vise à créer une application simple type SPA, permettant à un utilisateur de faire un tirage d'horoscope en ligne, via un appel d'API.


------------------------------------------ FICHIER, TECHNOLOGIE ET ARBORESCENCE -----------------------------------------------

Les fichiers sont fait pour fonctionner de la manière suivante :

index.html --> Fichier page d'accueil du projet, c'est ici que les utilisateurs arriveront lors de leur accès au site. Le but
de cette page est de leur fournir la possibilité de faire un tirage de message d'horoscope et de leur faite , via un appel d'API géré derrière par un fichier JavaScript.

js/app.js --> Ce fichier contiendra toute la logique de création dynamique des cartes en JavaScript permettant l'affichage des messages.
C'est également ce fichier qui sera en charge, via un appel API dont l'URL et la clé nous sont fournis, de récupérer lesdits 
message et d'en gérer l'affichage. Il ne sera pas utilisé par les autres pages HTML.

css/* --> Contient simplement l'intégralité des fichiers CSS utilisés pour le projet. Les fichiers sont tous nommé selon 
la formule : nomDuFichierStylisé.css

pages/* --> Contient les pages inclusent dans le footer du projet, c'est à dire la RGPD, les conditions générales d'utilisations,
les mentions légales et enfin l'à propos. 

.htaccess et .github/workflows/deploy.yml --> Ces fichiers sont là pour gérer le déploiement du projet, le fichier .htaccess à la racine
du projet permet de gérer le logique de fonctionnement du site : sur quelle page les utilisateurs atterissent quand ils arriveront
sur le site, vers quelle page rediriger en cas d'erreur, la durée de validité des données et fichiers mis en cache par le navigateur etc.
Le dossier .github quand à lui contient la logique de déploiement automatique de notre en site en suivant la technique CI/CD. En
faisant appel à une logique de Github ainsi qu'au renseignement de clés secretes dans le dépôt du projet, cela permet au projet
d'être automatiquement déployé sur le serveur dont les accès ont été fournis par les secrets rentrés au préalable dans les paramètres
du dépôt Github. Ainsi à chaque fois que le dépôt du projet sera mis à jour avec de nouvelles fonctionnalitées ou contenu, le site
sera en parallèle mis à jour avec ces nouvelles fonctionnalitées.

L'application aborde une organisation simple et précise des fichiers : le JavaScript, les feuilles de style en CSS3 et les pages
en HTML sont toutes les 3 séparées chacunes dans leurs dossiers respectif, ce qui facilite de plus la réutilisation de code 
en copiant les chemin d'accès et en remplaçant simplement le nom du fichier par celui attendu. Aussi, les différents fichiers des pages HTML
et CSS portent le même nom afin d'en faciliter le discernement. Le choix aurait également pu se porter sur la création d'une plus grosse feuille
de style commune, afin de limiter la taille du projet et la réutilisation de code (comme la stylisation du footer, qui est repétée à chaque pages),
mais dans un soucis de clareté, ainsi que limiter les bugs et faciliter le debug, je me suis plutôt porté sur une solution plus classique de 
1 page HTML = 1 feuille de style. 

L'arborescence du projet est conçu ainsi :

ECF-PROD/
|----->.github/
|       |___ workflows/
|           |___ deploy.yml
|
|----->css/
|      |___ apropos.css
|      |___ cgu.css
|      |___ mentionslegales.css
|      |___ rgpd.css
|      |___ index.css
|
|----->js/
|      |___ app.js
|
|----->pages/
|      |___ apropos.html
|      |___ cgu.html
|      |___ mentionslegales.html
|      |___ rgpd.html
|
|----->ressources/
|       |___ images/
|           |___ logo.webp
|
|___ .htaccess
|
|___ index.html

Pour la question des technologies, elles ont déjà été abordés précédement : le HTML5 pour le rendu de la page dans le navigateur,
le CSS3 pour le design des pages et les animations ainsi que JavaScript pour la gestion des interactions utilisateur - interface WEB. Ici il n'est
pas question d'utiliser des technologies relatives à la partie BackEnd d'un site, comme PHP8 car celà n'est pas le point d'évaluation
de cet ECF, se concentrant sur la partie FrontEnd d'un site Web.

------------------------------------------------- ACCES AU SITE ET REPO GITHUB ------------------------------------------------

Le site est accessible en ligne via le lien suivant : https://ecf1-roger-paulin.sidathsoeun.fr, et le code composant le site est disponible sur mon Github à l'adresse suivante : https://github.com/SkarOz/ECF-PROD.

Pour cloner localement le projet, vous pouvez directement télécharger le ZIP complet contenant le code sur la page Github du projet, ou alors utiliser la commande [git clone https://github.com/SkarOz/ECF-PROD.git] daans un terminal de commande en ayant Git d'installé sur votre machine.