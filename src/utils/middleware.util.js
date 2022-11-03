import validator from 'validator';
// Utils
import { forbidden, unauthorized, error } from '@/utils/helper.util';
import { check, renew } from '@/utils/auth.util';
import  path  from 'path';

/**
 * mw
 *
 * @param {*} required
 * @returns next()
 */
const mw = (required) => {
  return async (req, res, next) => {
    try {
      // console.log(req.headers)

      let token = req.headers['authorization'].replace('Bearer ', '');
      // console.log(token)
      if (token) {
        try {
          // Is JWT format
          // console.log(token ,'start')
          if (!validator.isJWT(token)) throw 'Token is not valid';

          // Add Bearer to authorization Header
          req.headers.authorization = `Bearer ${token}`;
          // Verify Token in Redis, if exists, then return decode token { key, ...data, iat }
          const decoded = await check(token);
          // Validate permissions
          // console.log(token ,'middele')

          if (required) {
      // console.log(decoded)
      // console.log(required ,'end')

            if ('permissions' in decoded) {
              const isAuthorized = required.filter((x) =>
                decoded.permissions.includes(x)
                
                );

              if (isAuthorized.length === 0) return forbidden(res);
            }
          }
          // Renew
          await renew(decoded.key);
          // Add to request
          // console.log(decoded.key)
          req.user = decoded;
          return next();
        } catch (errSession) {
          // console.log(errSession ,'jshajd')
          return unauthorized(res);
        }
      } else {

        return unauthorized(res);
      }
    } catch (err) {
      return error(res, err);
    }
  };
};

/**
 * mws
 *
 * @param {*} socket
 * @param {*} next
 * @returns next()
 */
const mws = async (socket, next) => {
  try {
    const token = socket.handshake.query?.Authorization;

    if (token) {
      // Is JWT format
      if (!validator.isJWT(token)) throw 'Token is not valid';

      // Verify Token in Redis, if exists, then return decode token { key, iat }
      const decoded = await check(token);

      // Renew
      await renew(decoded.key);

      // Add to request
      socket.user = {
        ...decoded,
        data: JSON.parse(socket.handshake.query?.data) || null
      };

      return next();
    } else {
      return next();
    }
  } catch (err) {
    console.log('❕Socket: error->', err.toString());
    return next(err);
  }
};

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
      const files = req.body.file
      const fileExtensions = []
      Object.keys(files).forEach(key => {
        console.log(files[key].name)
          fileExtensions.push(path.extname(files[key].name))
      })

      // Are the file extension allowed? 
      const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

      if (!allowed) {
          const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

          return res.status(422).json({ status: "error", message });
      }

      next()
  }
}


const MB = 5; // 5 MB 
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.body.file

    const filesOverLimit = []
    // Which files are over the limit?
    Object.keys(files).forEach(key => {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name)
        }
    })

    if (filesOverLimit.length) {
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(",", ", ");

        const message = filesOverLimit.length < 3
            ? sentence.replace(",", " and")
            : sentence.replace(/,(?=[^,]*$)/, " and");

        return res.status(413).json({ status: "error", message });

    }

    next()
}


const filesPayloadExists = (req, res, next) => {
  if (!req.body.file) return res.status(400).json({ status: "error", message: "Missing files" })
 
  next()
}

export { mw, mws ,fileExtLimiter ,fileSizeLimiter ,filesPayloadExists};
