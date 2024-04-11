const { Reservation } = require("../config/db.js");

const getAll = async function (_, res) {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json({ reservations });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur lors de la récupération des réservation",
        });
    }
};

const getOne = async function (req, res) {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        res.status(200).json({ reservation });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur lors de la récupération d'une réservation",
        });
    }
};

const post = async function (req, res) {
    try {
        // Récupérer les informations dans postman
        const {
            number_of_customers,
            reservation_date,
            reservation_name,
            reservation_note,
            reservation_status,
        } = req.body;

        // Créer la réservation avec les champs de postman
        const reservation = await Reservation.create({
            number_of_customers,
            reservation_date,
            reservation_name,
            reservation_note,
            reservation_status,
        });
        return res.status(200).json({ reservation });
    } catch (error) {
        return res.status(500).json({
            message: "Erreur serveur lors de la création d'une réservation",
        });
    }
};

const put = async function (req, res) {
    try {
        // Trouver une reservation avec son ID
        const id = req.params.id;

        // Récupérer les informations dans postman
        const {
            number_of_customers,
            reservation_date,
            reservation_name,
            reservation_note,
            reservation_status,
        } = req.body;

        // Chercher la réservation avec l'id
        const reservation = await Reservation.findByPk(id);

        // Vérifier qu'il y ai bien une réservation
        if (!reservation) {
            return res
                .status(404)
                .json({ message: "La réservation n'existe pas" });
        }

        // Modifier l'ancienne réservation par la nouvelle
        reservation.number_of_customers = number_of_customers;
        reservation.reservation_date = reservation_date;
        reservation.reservation_name = reservation_name;
        reservation.reservation_note = reservation_note;
        reservation.reservation_status = reservation_status;

        // Sauvegarder la nouvelle réservation
        await reservation.save();

        res.status(200).json({
            message: "La réservation a bien été mise à jour !",
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
        const reservation = await Reservation.findByPk(id);

        // Vérifier si la réservation existe
        if (!reservation) {
            return res
                .status(404)
                .json({ message: `La réservation ${id} n\'existe pas` });
        }

        // Supprime la réservation
        const deletedReservation = await reservation.destroy();

        // Vérifier que la réservation est supprimée
        if (deletedReservation === 0) {
            return res
                .status(404)
                .json({ message: `La réservation ${id} n\'existe pas` });
        }
        res.status(200).json({
            message: `La réservation ${id} a bien été supprimée !`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de données !",
        });
    }
};

module.exports = { getOne, getAll, post, put, destroy };
