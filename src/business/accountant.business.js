// Models
import AccountantModel from '@/models/accountant.model';
import CompanyModel from '@/models/company.model';

/**
 * login
 *
 * @param {*} username
 * @param {*} password
 * @returns {object}
 */
const login = async (username, password) => {
  const accountant = await AccountantModel.findOne({
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

  if (accountant) {
    if (accountant.deleted_at)
      throw {
        code: 'ERROR_LOGIN_1',
        message: `The accountant has been banned`
      };
    if (!accountant.password)
      throw {
        code: 'ERROR_LOGIN_2',
        message: `Don't have a password, try in recover password`
      };
    const isMatch = await AccountantModel.compare(
      password,
      accountant.password
    );
    if (!isMatch)
      throw {
        code: 'ERROR_LOGIN_3',
        message: `Incorrect password`
      };
    return accountant;
  } else {
    throw {
      code: 'ERROR_LOGIN_4',
      message: `Accountant not found`
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
const register = async (username, password, name, company_id = null) => {
  var code = Math.floor(1000 + Math.random() * 9000);
  const exists = await AccountantModel.exists({
    $or: [
      {
        email: username
      },
      {
        phone: username
      }
    ]
  });
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
  var accountant;
  if (exists) {
    accountant = await AccountantModel.updateOne(
      {
        $or: [
          {
            email: username
          },
          {
            phone: username
          }
        ]
      },
      {
        ...query,
        password,
        code_verification: code
      }
    );
  } else {
    accountant = await AccountantModel.create({
      ...query,
      password,
      code_verification: code
    });
  }
  if (accountant && company_id) {
    let company = await CompanyModel.updateOne(
      {
        _id: company_id
      },
      {
        accountant_id: accountant._id,
        accountant_status: 'Invited'
      }
    );
  }

  // const page = await PagesModel.create({ accountant: accountant._id });

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

    // relate to other collections
    // accountant.page = page
    // const created = await accountant.save()

    return accountant;
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

  const accountant = await AccountantModel.findOne({
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

  if (accountant) {
    // Send code here via Email
    await AccountantModel.updateOne(
      { _id: accountant._id },
      { code_verification: code }
    );

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
  return await AccountantModel.findOne({ _id: user_id, deleted_at: null })
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
  const accountant = await AccountantModel.findOne({
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

  if (accountant) {
    return await AccountantModel.findOneAndUpdate(
      { _id: accountant._id },
      { code_verification: null, isVerified: true },
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

const getAll = async () => {
  // Database query
  return await AccountantModel.find({});
};

const add = async (body) => {
  // Database query
  return await AccountantModel.create(body);
};

const update = async (body ,params) => {
  // Database query
  return await AccountantModel.findOneAndUpdate({_id:params.id},body);
};

const Delete = async (body,params) => {
  // Database query
  // var data = await CatagoryModel.find(body);
  // return data
  return await AccountantModel.findOneAndRemove({_id:params.id},body);
};

export default {
  login,
  register,
  recover,
  me,
  verify,
  getAll,
  add,
  update,
  Delete
};
