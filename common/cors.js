let allowlist = ['http://example1.com', 'http://example2.com'];

let corsOptionsDelegate = function (req, callback) {
  let corsOptions;

  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }

  callback(null, corsOptions)
}

module.exports = corsOptionsDelegate;