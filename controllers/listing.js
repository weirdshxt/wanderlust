const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Index

module.exports.index = async (req, res, next) => {
  const { category, location } = req.query; // Get category and location from query parameters
  const query = {}; // Create a base query object

  if (category) {
    query.category = category; // Add category filter if present
  }

  if (location) {
    query.location = { $regex: location, $options: "i" }; // Add location filter with case-insensitive regex
  }

  const allListings = await Listing.find(query); // Filter listings by category and/or location
  res.render("./listings/index.ejs", { allListings });
};

//  create new

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

// show Listing

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

// Add new Listing

module.exports.addNew = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 2,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Edit Listing

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }

  let ogImageUrl = listing.image.url;
  ogImageUrl = ogImageUrl.replace("/upload", "/upload/w_250");

  res.render("./listings/edit.ejs", { listing, ogImageUrl });
};

// Update Listing

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Destroy Listing

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
