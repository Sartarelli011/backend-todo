const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;
const userController = {
  register: async function (Request, Response) {
    const { name, email, password, confirmPassword } = Request.body;
    //validações
    if (!name) {
      return Response.status(422).send("o nome é obrigatório.");
    }
    if (!email) {
      return Response.status(422).send("o email é obrigatório.");
    }
    if (password !== confirmPassword) {
      return Response.status(422).send("As senhas não coincidem.");
    }
    //checando se o email já foi cadastrado.
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return Response.status(422).send(
        "Email já cadastrado, por favor utilize outro."
      );
    }
    //criptografando senha
    const salt = bcrypt.genSaltSync(14);
    const cryptpassword = bcrypt.hashSync(password, 10, salt);
    //criando usuário
    const user = new User({
      name: name,
      email: email,
      password: cryptpassword,
    });
    try {
      //salvando usuário no db
      const savedUser = await user.save();
      Response.send(savedUser);
    } catch (error) {
      Response.status(400).send({ error: error.message });
      console.log(error);
    }
  },

  login: async function (Request, Response) {
    const { email, password } = Request.body;
    const loginUser = await User.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    //validações
    if (!loginUser) {
      return Response.status(400).send("Email or Password incorrect.");
    }
    if (!passwordMatch) {
      return Response.status(400).send("Email or Password incorrect.");
    }
    //criando token
    const token = jwt.sign({ _id: loginUser._id }, secret);

    Response.status(200).send({ loginUser: loginUser._id, token: token });
  },
};

module.exports = userController;
