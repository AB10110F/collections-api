// login auth and gen token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const check = await bcrypt.compare(password, user.password);

    if (!(user && check)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const options = {
      algorithm: 'HS256',
      // expiresIn: '1h',
      header: {
        typ: 'JWT'
      }
    };

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.KEY, options);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
