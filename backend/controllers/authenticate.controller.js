const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require("../config/db");

const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async (req, res) => {
    try {

    // Stocker la variable pour chiffrer le mot de passe.
    const salt = await bcrypt.genSalt(10);

    // Récupération des données sur postman.
    const { firstname, lastname, birthday, phone_number, email, picture } = req.body

    // Récupération du mot de passe sur postman.
    const password = req.body.password

    // Sécuriser le mot de passe en transformant le mot de passe par une clé automatiquement générée.
    const hashedPassword = await bcrypt.hash(password, salt);

    // Stocker un utilisateur avec les informations inscrites dans postman.
    const user = {
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        phone_number: phone_number,
        email: email,
        password: hashedPassword,
        picture: picture
    };
    // Création de l'utilisateur.
        await User.create(user);
        
        res.status(200).json({message: `L'utilisateur a bien été créé`})
    } catch(error) {
        console.log(error)
    };
    }

    const signIn = async (req, res) => {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        // Vérifier que l'utilisateur contient bien une adresse email.
        if (!user) {
            return res.status(400).json({ message: "Nom d'utilisateur incorrect"});
        }

          // Comparer le mot de passe de postman avec le mot de passe dans ma base de donnée.
        const validPassword = await bcrypt.compare(req.body.password, user.password);

     // Vérifier que l'utilisateur contient bien le bon mot de passe.
        if (!validPassword) {
            res.status(400).json({ message: "Mot de passe incorrect"})
        }
    
        const payload = {
            id: user.id,
            email: user.email
        }
    
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    
        res.status(201).json({token: token});
    };

    module.exports = { signIn, signUp };