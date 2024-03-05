const User = require('../models/user');
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require('jsonwebtoken');
const user = require('../models/user');

exports.signup = (req, res, next) => {
    // console.log('user creation')
    // console.log(req.body)
    console.log(typeof(req.body.news))
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
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
                        user:user,
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        mail: user.email,
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

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
    const newPassword = req.body.password;
    const newPreferences = req.body.newsPref;
    const crypto = req.body.crypto
    const isAdmin = req.body.isAdmin
    console.log('Received isAdmin:', isAdmin);
    console.log(crypto)
    // Hasher le nouveau mot de passe avant de le stocker
    bcrypt.hash(newPassword, 10)
        .then((hashedPassword) => {
            // Utilisez le mot de passe haché pour mettre à jour l'utilisateur
            User.findByIdAndUpdate(
                userId,
                { password: hashedPassword, articlesPrefs: newPreferences,crypto:crypto ,isAdmin: isAdmin},
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
exports.getAllUsers = async (req, res) => {
    console.log("Début de la fonction getAllUsers");
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
    console.log("Fin de la fonction getAllUsers");
  };
  exports.createUser = (req, res, next) => {
    const { email, password, newsPref, crypto, isAdmin } = req.body;

    bcrypt.hash(password, 10)
        .then(hash => {
            const user = new User({
                email,
                password: hash,
                // Add any additional properties you need for user creation
                articlesPrefs: newsPref,
                crypto,
                isAdmin,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
exports.isAdmin = (req, res, next) => {
    // Check if the authenticated user is an admin
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: "Unauthorized: Admin access required." });
    }
    next();
};
