
INSERT INTO cargo (descricao) VALUES ('Coordenador');
INSERT INTO cargo (descricao) VALUES ('Dev');

INSERT INTO permissao (nome) values('ADMIN');
INSERT INTO permissao (nome) values('USER');

INSERT INTO usuario(nome, username, password, cargo_id) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',1);
INSERT INTO usuario(nome, username, password,cargo_id) VALUES ('Teste', 'teste','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',2);

INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 1);
--INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 2);
INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (2, 2);

INSERT INTO etapa (nome, descricao,usuario_id) VALUES ('BACKLOG', 'Lista de tarefas pendentes', 1);
INSERT INTO etapa (nome, descricao,usuario_id) VALUES ('ANALISE', 'Lista de tarefas pendentes', 1);

INSERT INTO sub_etapa (nome, descricao,etapa_id) VALUES ('IMPORTANTES', 'Urgências', 1)
INSERT INTO sub_etapa (nome, descricao,etapa_id) VALUES ('NORMAIS', 'Normal', 1)
INSERT INTO sub_etapa (nome, descricao,etapa_id) VALUES ('subetapa com etapa 2', 'Normal3', 2)

INSERT INTO projeto(nome,descricao,data_inicio,data_limite,data_fim,usuario_id) VALUES('PROJETO 01','CONTROLE DE PROJETOS','2021-01-01','2021-08-01',null,1)
INSERT INTO projeto(nome,descricao,data_inicio,data_limite,data_fim,usuario_id) VALUES('PROJETO 02','CONTROLE DE PROJETOS 2','2021-01-01','2021-08-01',null,2)

INSERT INTO sprint(nome,data_inicio,data_limite,data_fim,projeto_id,usuario_id)VALUES ('Sprint01','2021-01-01','2021-02-01',null,1,1)
INSERT INTO sprint(nome,data_inicio,data_limite,data_fim,projeto_id,usuario_id)VALUES ('Sprint02','2021-01-01','2021-02-01',null,2,2)

INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Planejamento','Planejar como será o projeto', '2021-01-01','2021-02-01','Backlog',1,1,1,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 2','blablabla2', null,null,'To Do',1,1,2,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 3','blablabla3', null,null,'Doing',1,1,2,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 4','blablabla4', null,null,'Test',1,1,2,1)
INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,status,etapa_id,projeto_id,usuario_id,sprint_id) VALUES ('Solicitação 5','blablabla5', null,null,'Done',1,1,2,2)