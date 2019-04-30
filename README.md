# AppPotes2.0
Serveur photo avec un système d'évènements pour groupe d'amis.

;#####################################################;
;                                                     ;
;               INSTALLATION ENV DEV                  ;
;                                                     ;
;#####################################################;

_______________________________________________________

    Installation des logiciels et outils 
_______________________________________________________

1. Installer NodeJS
   Besoin des commandes : "npm", "ng".
2. Installer Composer (Le gestionnaire de paquet PHP)
_______________________________________________________

    Récupération du projet sur github.
_______________________________________________________

// Les instructions précédées d'un '$' indique une commande.

1. Ce placer dans le répertoire où le projet doit
   être installé.

2. Cmd pour cloner le projet dans le répertoire courant, un
   répertoire Appotes2.0 sera créé.
      $ git clone https://github.com/M-Leveque/AppPotes2.0.git 

_______________________________________________________

    Installation de l'application front Angular
_______________________________________________________

// L'application front se trouve dans le dossier
   "/AppPotes-web".

1. Ce placer dans le repertoire Appotes-web.

2. Installation d'angular :
      $ npm install @angular/cli

3. Installation des dépendence du projet :
      $ npm install

4. Lancement du projet avec la cmd : 
      $ ng serve --open
   ( L'URL du serveur est indiqué, exemple: 127.0.0.1:4200 )
_______________________________________________________

    Installation de l'application back PHP Laravel
_______________________________________________________

// L'application back se trouve dans le dossier
   "/AppPotes-api".

1. Ce placer dans le repertoire Appotes-api

2. Installation des dépendances PHP
      $ composer install

3. Lancement de l'api 
      $ php artisan serve
   ( L'URL du serveur est indiqué, exemple: 127.0.0.1:8000 )
