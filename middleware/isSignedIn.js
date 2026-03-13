const isSignedIn = (req, res, next) => {
  if (req.session.user) {
    next(); // allow the user to the authorized route
  } else {
    res.redirect("/");
  }
};

module.exports = isSignedIn