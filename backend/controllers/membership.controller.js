const { Membership } = require("../config/db.js");

const getAll = async function (_, res) {
    try {
        const memberships = await Membership.findAll();
        res.status(200).json({ memberships });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des memberships",
        });
    }
};

const getOne = async function (req, res) {
    try {
        const membership = await Membership.findByPk(req.params.id);
        res.status(200).json({ membership });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur lors de la récupération d'un membership",
        });
    }
};

const post = async function (req, res) {
    try {
        // Récupérer les informations dans postman
        const { number_of_reservations, date_validity } = req.body;

        // Créer la réservation avec les champs de postman
        const membership = await Reservation.create({
            number_of_reservations,
            date_validity,
        });
        return res.status(200).json({ membership });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Erreur serveur lors de la création d'un membership",
            });
    }
};

const put = async function (req, res) {
    try {
        // Trouver une reservation avec son ID
        const id = req.params.id;

        // Récupérer les informations dans postman
        const { number_of_reservations, date_validity } = req.body;

        // Chercher la réservation avec l'id
        const membership = await Membership.findByPk(id);

        // Vérifier qu'il y ai bien une réservation
        if (!membership) {
            return res
                .status(404)
                .json({ message: "Le membership n'existe pas" });
        }

        // Modifier l'ancienne réservation par la nouvelle
        membership.number_of_reservations = number_of_reservations;
        membership.date_validity = date_validity;

        // Sauvegarder la nouvelle réservation
        await membership.save();

        res.status(200).json({
            message: "Le membership a bien été mise à jour !",
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur lors du traîtement des données",
        });
    }
};

const destroy = async function (req, res) {
    try {
        // Récupération de l'id
        const id = req.params.id;

        // Trouver la réservation avec l'id
        const membership = await Membership.findByPk(id);

        // Vérifier si la réservation existe
        if (!membership) {
            return res
                .status(404)
                .json({ message: `Le membership ${id} n\'existe pas` });
        }

        // Supprime la réservation
        const deletedMembership = await Membership.destroy();

        // Vérifier que la réservation est supprimée
        if (deletedMembership === 0) {
            return res
                .status(404)
                .json({ message: `Le membership ${id} n\'existe pas` });
        }
        res.status(200).json({
            message: `Le membership ${id} a bien été supprimée !`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de données !",
        });
    }
};

module.exports = { getOne, getAll, post, put, destroy };
