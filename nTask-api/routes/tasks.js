module.exports = app => {

  const Tasks = app.db.models.Tasks;

  app.route("/tasks")
    .all(app.auth.authenticate())
    .get((req, res) => {
      // "/tasks": Lista tarefas
      Tasks.findAll({
          where: {
            user_id: req.user.id
          }
        })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({
            msg: error.message
          });
        })
    })
    .post((req, res) => {
      // "/tasks": Cadastra uma nova tarefa
      req.body.user_id = req.user.id;
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({
            msg: error.message
          });
        })
    });

  app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      // "/tasks/1" : Consulta uma tarefa
      Tasks.findAll({
          where: {
            id: req.params.id,
            user_id: req.user.id
          }
        })
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({
            msg: error.message
          });
        })
    })
    .put((req, res) => {
      // "/tasks/1" : Atualiza uma tarefa
      Tasks.update(req.body, {
          id: req.params.id,
          user_id: req.user.id
        })
        .then(result => sendStatus(204))
        .catch(error => {
          res.status(412).json({
            msg: error.message
          });
        })
    })
    .delete((req, res) => {
      // "/tasks/1" : Exclui uma tarefa
      Tasks.destroy({
          id: req.params.id,
          user_id: req.user.id
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({
            msg: error.message
          });
        });
    });
};
