const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.setUserName = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.currUser = req.user; // Assuming req.user contains the user object
        res.locals.userName = req.user.username; // Set the username in res.locals
    } else {
        res.locals.currUser = null;
        res.locals.userName = null; // Clear username if not authenticated
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};


module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

   let listing = await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You are not the owner of this listing.");
      return res.redirect(`/listings/${id}`);
    }
    next();
}



module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  let review = await Review.findById(reviewId);

  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Validation.

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log(error);
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};