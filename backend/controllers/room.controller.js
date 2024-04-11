const { Room } = require("../config/db.js");

const getAll = async function (req, res) {
    try {
        const rooms = await Room.findAll();
        res.status(200).json({ rooms });
    } catch (error) {
        res.status(500).json({
            message: `Erreur serveur lors de la récupération des Rooms`,
        });
    }
};

const getOne = async function (req, res) {
    try {
        // Récupération de l'id dans postman
        const id = req.params.id;

        // Trouver la room par son id
        const room = await Room.findByPk(id);

        // Vérifier si la room existe
        if (!room) {
            return res
                .status(404)
                .json({ message: `La room ${id} n'existe pas !` });
        }
        res.status(200).json({ room });
    } catch (error) {
        res.status(500).json({
            message: `Erreur serveur lors de la récupération d'une Room`,
        });
    }
};

const post = async function (req, res) {
    try {
        // Récupérer les informations dans postman
        const { name } = req.body;
        // Création d'une room
        const room = await Room.create({
            // Ajouter la valeur de postman dans notre base de donnée
            name,
        });
        res.status(200).json({ room });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur lors de la création de room",
        });
    }
};

const put = async function (req, res) {
    try {
        // Trouver une room avec son ID
        const id = req.params.id;

        // Récupérer les informations dans postman
        const { name } = req.body;

        // Chercher la room avec l'id
        const room = await Room.findByPk(id);

        // Vérifie qu'il y a bien une room
        if (!room) {
            return res
                .status(404)
                .json({ message: `La Room ${id} n'existe pas` });
        }

        // Modifier l'ancienne room par la nouvelle
        room.name = name;

        // Sauvegarder la nouvelle réservation
        await room.save();

        res.status(200).json({ message: `La room a bien été modifiée` });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: `Erreur serveur lors de la modification d'une room`,
            });
    }
};

const destroy = async function (req, res) {
    try {
        // Récuperer l'id
        const id = req.params.id;

        // Trouver la room avec l'id
        const name = await Room.findByPk(id);

        // Vérification que la room existe
        if (!name) {
            return res
                .status(404)
                .json({ message: `La room ${id} n'existe pas` });
        }

        const deletedRoom = await name.destroy();

        // Vérifier que la réservation est supprimée
        if (deletedRoom === 0) {
            return res
                .status(404)
                .json({ message: `La room ${id} n\'existe pas` });
        }

        return res
            .status(200)
            .json({ message: `La room ${id} a bien été supprimée` });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: `Erreur serveur lors de la suppression d'une room`,
            });
    }
};

module.exports = { getOne, getAll, post, put, destroy };
