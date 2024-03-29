
INSERT INTO cargo (descricao) VALUES ('Coordenador');
INSERT INTO cargo (descricao) VALUES ('Dev');

INSERT INTO permissao (nome) values('ROLE_ADMIN');
INSERT INTO permissao (nome) values('ROLE_USER');

INSERT INTO usuario(nome, username, password, cargo_id) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',1);
INSERT INTO usuario(nome, username, password,cargo_id) VALUES ('Teste', 'teste','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',2);
INSERT INTO usuario(nome, username, password,cargo_id) VALUES ('Usuário 1', 'user1','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',2);
INSERT INTO usuario(nome, username, password,cargo_id) VALUES ('Usuário 2', 'user2','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',2);

INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 1);
--INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 2);
INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (2, 2);

INSERT INTO etapa (nome, descricao,usuario_id) VALUES ('ESTUDO', 'Lista de tarefas pendentes', 1);
INSERT INTO etapa (nome, descricao,usuario_id) VALUES ('ANALISE', 'Lista de tarefas em análise', 1);

INSERT INTO sub_etapa (nome, descricao,etapa_id) VALUES ('IMPORTANTES', 'Urgências', 1)
INSERT INTO sub_etapa (nome, descricao,etapa_id) VALUES ('NORMAIS', 'Normal', 1)
INSERT INTO sub_etapa (nome, descricao,etapa_id) VALUES ('subetapa com etapa 2', 'Normal3', 2)

INSERT INTO projeto(nome,descricao,data_inicio,data_limite,data_fim,usuario_id) VALUES('PROJETO 01','CONTROLE DE PROJETOS','2021-01-01','2021-08-01',null,1)
INSERT INTO projeto(nome,descricao,data_inicio,data_limite,data_fim,usuario_id) VALUES('PROJETO 02','CONTROLE DE PROJETOS 2','2021-01-01','2021-08-01',null,2)
INSERT INTO projeto(nome,descricao,data_inicio,data_limite,data_fim,usuario_id) VALUES('PROJETO 03','CONTROLE DE PROJETOS 3','2022-01-01','2022-08-01',null,1)

INSERT INTO projeto_membros(projeto_id,usuario_id) VALUES(1,1);
INSERT INTO projeto_membros(projeto_id,usuario_id) VALUES(2,1);
INSERT INTO projeto_membros(projeto_id,usuario_id) VALUES(1,2);
INSERT INTO projeto_membros(projeto_id,usuario_id) VALUES(1,3);
INSERT INTO projeto_membros(projeto_id,usuario_id) VALUES(1,4);

INSERT INTO sprint(nome,data_inicio,data_limite,data_fim,projeto_id,usuario_id)VALUES ('Sprint01','2023-04-04','2021-02-01',null,1,1)
INSERT INTO sprint(nome,data_inicio,data_limite,data_fim,projeto_id,usuario_id)VALUES ('Sprint02','2022-02-02','2021-02-01',null,2,2)
INSERT INTO sprint(nome,data_inicio,data_limite,data_fim,projeto_id,usuario_id)VALUES ('Sprint02 - terminada','2022-02-02','2021-02-01','2023-02-01',2,2)

INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 1','Planejar como será o projeto', '2021-01-01','2021-02-01','Backlog',1,1,1,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 2','blablabla2', null,null,'To Do',1,1,1,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 3','blablabla3', null,null,'Doing',1,1,1,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 4','blablabla4', null,null,'Test',1,1,1,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 5','blablabla5', null,null,'Done',1,1,1,2)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 6','blablabla2', null,null,'To Do',1,1,2,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 7','blablabla3', null,null,'Doing',1,1,2,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 8','blablabla4', null,null,'Test',1,3,2,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 9','blablabla5', null,null,'Done',1,2,2,2)