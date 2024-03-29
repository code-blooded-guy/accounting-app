// Models
import UserModel from '@/models/user.model';

/**
 * login
 *
 * @param {*} username
 * @param {*} password
 * @returns {object}
 */
const login = async (username, password) => {
  const user = await UserModel.findOne({
    $or: [
      {
        email: username
      },
      {
        phone: username
      }
    ]
  })
    .select('+password')
    .lean();

  if (user) {
    if (user.deleted_at)
      throw {
        code: 'ERROR_LOGIN_1',
        message: `The user has been banned`
      };
    if (!user.password)
      throw {
        code: 'ERROR_LOGIN_2',
        message: `Don't have a password, try in recover password`
      };
    const isMatch = await UserModel.compare(password, user.password);
    if (!isMatch)
      throw {
        code: 'ERROR_LOGIN_3',
        message: `Incorrect password`
      };
    return user;
  } else {
    throw {
      code: 'ERROR_LOGIN_4',
      message: `User not found`
    };
  }
};

/**
 *
 * register
 *
 * @param {*} username
 * @param {*} password
 * @returns {object}
 */
const register = async (username, password, name, terms) => {
  var code = Math.floor(1000 + Math.random() * 9000);
  const exists = await UserModel.exists({
    $or: [
      {
        email: username
      },
      {
        phone: username
      }
    ]
  });

  if (exists) {
    throw {
      code: 'ERROR_REGISTER_1',
      message: `${username} is already registered`,
      params: { username }
    };
  } else {
    const query = {
      name: name
    };

    if (username.includes('@')) {
      query.email = username;
      query.phone = username;
    } else {
      query.phone = username;
      query.email = username;
    }
    code = '0000';
    const user = await UserModel.create({
      ...query,
      password,
      check_terms: terms,
      code_verification: code
    });

    // const page = await PagesModel.create({ user: user._id });

    // Send Code
    if (username.includes('@')) {
      // sendEmail({
      //   to: username,
      //   from: "hi@nodetomic.com",
      //   subject: "Nodetomic: bienvenido",
      //   message: `Código: ${code}`,
      //   template: "register",
      //   params: {
      //     code,
      //   },
      // });
    } else {
      // sendSMS({
      //   to: username,
      //   from: "Nodetomic",
      //   message: `Nodetomic: ${code}`,
      // });
    }

    // relate to other collections
    // user.page = page
    // const created = await user.save()

    return user;
  }
};

/**
 * recover
 *
 * @param {*} email
 * @returns {object}
 */
const recover = async (username) => {
  const code = Math.floor(1000 + Math.random() * 9000);

  const user = await UserModel.findOne({
    $or: [
      {
        email: username
      },
      {
        phone: username
      }
    ],
    deleted_at: null
  }).lean();

  if (user) {
    // Send code here via Email
    await UserModel.updateOne({ _id: user._id }, { code_verification: code });

    if (username.includes('@')) {
      // sendEmail({
      //   to: username,
      //   from: "hi@nodetomic.com",
      //   subject: "Nodetomic: recuperar cuenta",
      //   message: `Nodetomic: ${code}`,
      //   template: "recover",
      //   params: {
      //     code,
      //   },
      // });
    } else {
      // sendSMS({
      //   to: username,
      //   from: "Nodetomic",
      //   message: `Nodetomic: ${code}`,
      // });
    }

    return {
      sent: `Sent code to ${username}`
    };
  } else {
    throw {
      code: 'ERROR_RECOVER_1',
      message: `${username} is not registered`,
      params: { username }
    };
  }
};

/**
 * me
 *
 * @param {*} userId
 * @returns {object}
 */
const me = async (user_id) => {
  return await UserModel.findOne({ _id: user_id, deleted_at: null })
    .select('phone email name last_name created_at')
    .lean();
};

/**
 * verify
 *
 * @param {*} username
 * @param {*} code
 * @returns {object}
 */
const verify = async (username, code) => {
  const user = await UserModel.findOne({
    $or: [
      {
        email: username
      },
      {
        phone: username
      }
    ],
    code_verification: code,
    deleted_at: null
  }).lean();

  if (user) {
    return await UserModel.findOneAndUpdate(
      { _id: user._id },
      { isVerified: true },
      { new: true }
    );
  } else {
    throw {
      code: 'ERROR_VERIFY_1',
      message: `Invalid code`,
      params: { code }
    };
  }
};

/**
 * check
 *
 * @param {*} username
 * @returns {boolean}
 */
const check = async (username) => {
  const user = await UserModel.findOne({
    $or: [
      {
        email: username
      },
      {
        phone: username
      }
    ],
    deleted_at: null
  }).lean();

  return !!user;
};

export default {
  login,
  register,
  recover,
  me,
  verify,
  check
};
