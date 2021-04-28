
INSERT INTO cargo (descricao) VALUES ('Coordenador');
INSERT INTO cargo (descricao) VALUES ('Dev');

INSERT INTO permissao (nome) values('ROLE_ADMIN');
INSERT INTO permissao (nome) values('ROLE_USER');

INSERT INTO usuario(nome, username, password, cargo_id) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',1);
INSERT INTO usuario(nome, username, password,cargo_id) VALUES ('Teste', 'teste','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem',2);

INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 1);
INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 2);
INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (2, 2);

INSERT INTO etapa (nome, descricao,status,usuario_id) VALUES ('BACKLOG', 'Lista de tarefas pendentes','TO DO', 1)
INSERT INTO etapa (nome, descricao,status,usuario_id) VALUES ('2BACKLOG2', 'Lista de tarefas pendentes','TO DO', 1)

INSERT INTO sub_etapa (nome, descricao,status,etapa_id) VALUES ('IMPORTANTES', 'Urgências','TO DO', 1)
INSERT INTO sub_etapa (nome, descricao,status,etapa_id) VALUES ('NORMAIS', 'Normal','TO DO', 1)
INSERT INTO sub_etapa (nome, descricao,status,etapa_id) VALUES ('subetapa com etapa 2', 'Normal3','TO DO', 2)

INSERT INTO projeto(nome,descricao,data_inicio,data_limite,data_fim,usuario_id) VALUES('PROJETO TCC','CONTROLE DE PROJETOS','2021-01-01','2021-08-01',null,1)

INSERT INTO sprint(nome,data_inicio,data_limite,data_fim,projeto_id,usuario_id)VALUES ('Sprint01','2021-01-01','2021-02-01',null,1,1)

INSERT INTO solicitacao(nome,descricao,data_inicio,data_fim,etapa_id,projeto_id,sprint_id) VALUES ('Planejamento','Planejar como será o projeto', null,null,1,1,null)