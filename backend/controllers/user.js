const User = require('../models/user');
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//medhi
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: "Deleted!",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.putUser = (req, res, next) => {
    const userId = req.params.id;

    // Exemple : Récupération du nouveau mot de passe depuis le corps de la requête
    const newPasswd = req.body.password;

    // Hasher le nouveau mot de passe avant de le stocker
    bcrypt.hash(newPasswd, 10)
        .then((hashedPassword) => {
            // Utilisez le mot de passe haché pour mettre à jour l'utilisateur
            User.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true, runValidators: true }
            )
                .then((updatedUser) => {
                    if (!updatedUser) {
                        return res.status(404).json({ message: "Utilisateur non trouvé" });
                    }

                    res.status(200).json({ message: "Utilisateur mis à jour avec succès", user: updatedUser });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: "Erreur interne du serveur" });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        });
};


exports.getUser = (req, res, next) => {
    User.findOne({
        _id: req.params.id,
    })
        .then((thing) => {
            res.status(200).json(thing);
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
};

exports.logout = (req, res) => {
    // Vous pouvez ajouter ici la logique pour ajouter le token à la liste noire,
    // mais dans le cas de JWT, cela est souvent géré côté client.

    // Vous pouvez simplement envoyer une réponse réussie
    res.status(200).json({ message: 'Déconnexion réussie' });
};
