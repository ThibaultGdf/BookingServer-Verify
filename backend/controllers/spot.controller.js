const { Spot } = require("../config/db.js");

const getAll = async function (req, res) {
    try {
        // Trouver tous les spots
        const spots = await Spot.findAll();
        res.status(200).json({ spots });
    } catch (error) {
        res.json(error);
    }
};

const getOne = async function (req, res) {
    try {
        // Récupération de l'id dans postman
        const id = req.params.id;
        // Trouver le spot par son id
        const spot = await Spot.findByPk(id);

        // Vérifie si le spot existe
        if (!spot) {
            return res
                .status(404)
                .json({ message: `La room ${id} n'existe pas !` });
        }
        res.status(200).json({ spot });
    } catch (error) {
        res.status(500).json({
            message: `Erreur lors de la récupération d'un spot !`,
        });
    }
};

const post = async function (req, res) {
    try {
        const { name } = req.body;
        const spot = await Spot.create({
            name,
        });
        res.status(200).json({ spot });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: `Erreur serveur lors de la création d'un spot !`,
            });
    }
};

const put = async function (req, res) {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const spot = await Spot.findByPk(id);

        // Vérifie qu'il y a bien une room
        if (!spot) {
            return res
                .status(404)
                .json({ message: `Le Spot ${id} n'existe pas` });
        }

        // Modifier l'ancienne room par la nouvelle
        spot.name = name;

        res.status(200).json({ spot });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: `Erreur serveur lors de la modification d'un spot !`,
            });
    }
};

const destroy = async function (req, res) {
    try {
        const id = req.params.id;

        const spot = await Spot.findByPk(id);

        if (!spot) {
            res.status(404).json({ message: `Le Spot ${id} n'existe pas` });
        }

        const deletedSpot = await name.destroy();

        if (deletedSpot === 0) {
            return res
                .status(404)
                .json({ message: `Le spot ${id} n\'existe pas` });
        }

        res.status(200).json({
            message: `Votre spot ${id} a bien été supprimé`,
        });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: `Erreur serveur lors de la suppession d'un spot !`,
            });
    }
};

module.exports = { getAll, getOne, post, put, destroy };
