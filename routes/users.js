const { Router } = require(`express`);
const { User } = require(`../models/index`);

usersRouter = Router();

usersRouter.get(`/`, async (req, res) => {
    const users = await User.findAll({});
    res.json(users);
});

usersRouter.get(`/:id`, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

usersRouter.post(`/`, async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
});

usersRouter.put(`/:id`, async (req, res) => {
    await User.update(req.body, {where: {id: req.params.id}});
    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
});

usersRouter.delete(`/:id`, async (req, res) => {
    const deletedUser = await User.findByPk(req.params.id);
    await deletedUser.destroy();
    res.json(deletedUser);
});

module.exports = { usersRouter }