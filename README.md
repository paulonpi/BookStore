# Bookstore Application
Descrição
Este é um projeto de gerenciamento de livraria que permite gerenciar autores, livros e assuntos. O projeto foi desenvolvido com .NET no back-end, Angular no front-end, e um banco de dados SQL Server, todos orquestrados usando Docker Compose.

# Funcionalidades
Gerenciamento de autores: cadastro, edição, listagem e exclusão.
Gerenciamento de livros: cadastro, edição, listagem e exclusão.
Gerenciamento de assuntos: criação e organização de categorias.

# Estrutura do Projeto

Back-End:
Desenvolvido em .NET 8 com Entity Framework para acesso ao banco de dados.
Serviços dedicados para autores, livros e assuntos.

Front-End:
Desenvolvido em Angular.
Comunicação com o back-end via HTTP usando o padrão REST API.
UI modular e organizada.

Banco de Dados:
Executado em um contêiner SQL Server.

# Pré-requisitos
Certifique-se de ter instalado:
Docker e Docker Compose.

# Como Configurar e Executar
Clone o repositório:
git clone https://github.com/seu-usuario/bookstore-app.git
cd bookstore-app

Execute o projeto usando Docker Compose:
docker-compose up --build

Aguarde os contêineres iniciarem. O sistema estará acessível nos seguintes endereços:

Front-End: http://localhost:4200
API (Back-End): http://localhost:5110
Swagger: http://localhost:5110/swagger/index.html

# Configuração do Banco de Dados
O banco de dados será automaticamente iniciado no contêiner bookstore_sql com as seguintes credenciais:
Usuário: sa
Senha: YourStrongPassword123!
Caso precise ajustar as credenciais, altere no arquivo docker-compose.yml:
environment:
  - MSSQL_SA_PASSWORD=YourStrongPassword123!

As migrations do banco de dados são aplicadas automaticamente quando o contêiner do back-end é iniciado.

# Uso
Após iniciar o projeto com docker-compose, abra http://localhost:4200.
Navegue pela interface para gerenciar autores, livros e assuntos.