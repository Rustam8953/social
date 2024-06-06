const {prisma} = require("../prisma/prisma-client");
const bcrypt = require('bcryptjs');
const jIcon = require('jdenticon');
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const UserController = {
    register: async (req, res) => {
        const {email, password, name} = req.body;
        if(!email || !password || !name) {
            return res.status(400).json({error: "Все поля обязательны"});
        }

        try {
            const existUser = await prisma.user.findUnique(({
                where: {email}
            }))
            if(existUser) {
                return res.status(400).json({error: "Пользователь уже существует!"})
            }
            const hashPass = await bcrypt.hash(password, 10);
            const png = jIcon.toPng(name, 200);
            const avatarName = `${name}_${Date.now()}.png`;
            const pathAvatar = path.join(__dirname, "../uploads", avatarName);
            fs.writeFileSync(pathAvatar, png);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashPass,
                    name,
                    avatarUrl: `/uploads/${pathAvatar}`
                }
            })
            res.json(user);
        } catch (error) {
            console.error("Ошибка при регистрации", error);
            res.status(500).json({error: "Ошибка сервера"});
        }
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({error: "Не все поля заполнены!"});
        }
        try {
            const user = await prisma.user.findUnique({where: {email}});
            if(!user) {
                return res.status(400).json({error: "Не верный логин или пароль"});
            }
            const valid = await bcrypt.compare(password, user.password);
            if(!valid) {
                return res.status(400).json({error: "Неверно введены данные!"})
            }
            const token = jwt.sign(({userId: user.id}), process.env.SECRET_KEY);
            res.json({token});
        } catch (error) {
            console.error("Sign Error", error);
            res.status(500).json({error: "Ошибка входа"})
        }
    },
    getUserById: async (req, res) => {
        const {id} = req.params;
        const userId = req.user.userId;
        try {
            const user = await prisma.user.findUnique({
                where: {id},
                include: {    
                    followers: true,
                    following: true
                }
            })
            if(!user) {
                return res.status(404).json({error: "Пользователь не найден"});
            }
            const isFollowing = await prisma.follows.findFirst({
                where: {
                    AND: [
                        {followerId: user.id},
                        {followingId: id}
                    ]
                }
            })
            res.json({...user, isFollowing: Boolean(isFollowing)})
        } catch (error) {
            console.error("Get Current Error", error);
            res.status(500).json({error: "Internal server error"});
        }
    },
    updateUser: async (req, res) => {
        res.send("Update");
    },
    current: async (req, res) => {
        res.send("Current");
    },
};
module.exports = UserController;