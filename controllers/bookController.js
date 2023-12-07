const Book = require("../models/bookModel");
const Paragraph = require("../models/paragraphModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllBooks = async (req, res, next) => {
  //   const books = await Book.find();

  const features = new APIFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const books = await features.query;

  res.status(200).json({
    status: "success",
    data: {
      books,
    },
  });
};

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const { title, content, authorId } = req.body;

  // 1. Créer paragraph
  const firstParagraph = await Paragraph.create({ content, author: authorId });
  // const firstParagraph = await Paragraph.create({ content });

  // Créer le nouveau livre avec le premier paragraphe
  const newBook = await Book.create({
    title,
    author: authorId,
    paragraphs: [firstParagraph._id],
    contributors: [authorId],
  });

  res.status(201).json({
    status: "success",
    data: {
      newBook,
    },
  });
});

exports.deleteBook = async (req, res, next) => {
  const delBook = await Book.findByIdAndDelete(req.params.bookId);

  res.status(204).json({ data: null });
};

// Get books light (moi)
