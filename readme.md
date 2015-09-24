# Comandos executados:

# Cria o arquivo "package.json" já com valores default
npm init
npm install express@4.8 --save

# Criando arquivo de configuração do NodeJs
/config/express.js


# Rodando o servidor (http://localhost:3000):
node server

# Templates Engine do Express => EJS (http://embeddedjs.com)
npm install ejs@0.8 --save


# O nodemon evitar termos que reiniciar o servidor para refletir atualizações 
npm install nodemon -g
nodemon server

# Utilizando 'method-override' para navegadores que não suportam 
# os metodos HTTP: DELETE, PUT
npm install body-parser@1.6 method-override@2.1 --save

# Instalando Bower para gerenciamento de dependências do front-end
npm install bower@1.3 -g
bower init

# Criando o arquivo '.bowerrc' para configurar em qual pasta serão salvas as dependêcnias do Bower
# bower install pacote#versao --save
# bower search angular
# bower info angular
# bower uninstall angular --save
bower install angular#1.3 --save

# Adicionando modulo de rotas do AngularJS
bower install angular-route#1.3 --save

# Adicionando Bootstrap pelo Bower
bower install bootstrap#3.3 --save

# Add. 'angular-resource' para trabalhar com REST
bower install angular-resource#1.3 --save









# ##############################################################
# MongoDB
# ##############################################################
mongo --port 27017 --host localhost

# Cria 'db' 'contatooh'
use contatooh

# Cria registro no MongoDB na collection 'contatos' dentro do db 'contatooh'
var contato1 = { "nome" : "Contato 1 Mongo", "email" : "cont1@empresa.com.br" }
var contato2 = { "nome" : "Contato 2 Mongo", "email" : "cont2@empresa.com.br" }
var contato3 = { "nome" : "Contato 3 Mongo", "email" : "cont3@empresa.com.br" }
db.contatos.insert(contato1)
db.contatos.insert(contato2)
db.contatos.insert(contato3)

# Mostra Collections criadas
show dbs
show collections

# Buscando documentos
db.contatos.find();

# apagando o banco 
db.dropDatabase();

# Vendo registro a registro
var contatos = db.contatos.find()
contatos.next()
contatos.next()
contatos.next()

# Retorna apenas o primeiro registro
db.contatos.findOne()

# Buscas com critérios
var criterio = { "email" : "cont2@empresa.com.br" }
var contato = db.contatos.find(criterio)
contato



