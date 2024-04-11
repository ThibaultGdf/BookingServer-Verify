const { User } = require("../config/db.js");

const getAll = async function (req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        res.json(error);
    }
};

const getOne = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res
                .status(404)
                .json({ message: `L'utilisateur n'existe pas` });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: `Erreur serveur lors de la récupération d'un utilisateur !`,
        });
    }
};

const editRole = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res
                .status(404)
                .json({ message: `L'utilisateur n'existe pas !` });
        }

        user.user_role = req.body.role;

        await user.save();

        res.status(200).json({
            message: `Le rôle a bien été modifié à l'utilisateur ${id}`,
        });
    } catch (error) {
        return res.status(500).json({
            message: `Erreur serveur lors de la modification d'un rôle !`,
        });
    }
};
const put = async function (req, res) {
    try {
        // Trouver une reservation avec son ID
        const id = req.params.id;
        // Récupérer les informations dans postman
        const { firstname, lastname, email, user_password } = req.body;
        // Chercher la réservation avec l'id
        const user = await User.findByPk(id);
        // Vérifier qu'il y ai bien un utilisateur
        if (!user) {
            return res
                .status(404)
                .json({ message: `L'utilisateur n'existe pas` });
        }

        // Modifier l'ancienne valeur par la nouvelle
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.user_password = user_password;

        // Sauvegarder la nouvelle réservation
        await user.save();

        res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({
            message: `Erreur serveur lors de la modification d'un utilisateur !`,
        });
    }
};

const destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({
                message: `L'utilisateur ${id} n'existe pas !`,
            });
        }

        const deletedUser = await user.destroy();

        if (deletedUser === 0) {
            res.status(404).json({
                message: `L'utilisateur ${id} n'existe pas !`,
            });
        }

        res.status(200).json({
            message: `L'utilisateur ${id} a bien été supprimé !`,
        });
    } catch (error) {
        res.status(500).json({
            message: `Erreur serveur lors de la suppression d'un utilisateur !`,
        });
    }
};

module.exports = { getAll, getOne, editRole, put, destroy };
