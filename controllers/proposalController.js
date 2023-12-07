const Proposal = require("../models/proposalModel");

exports.getAllProposals = async (req, res) => {
  const { bookId } = req.params;

  // Rechercher toutes les propositions liées au livre
  const proposals = await Proposal.find({ book: bookId });

  res.status(200).json(proposals);
};

exports.createProposal = async (req, res) => {
  const { bookId } = req.params;
  const { content, authorId } = req.body;

  const newProposal = new Proposal({
    content,
    author,
    book: bookId,
  });

  // Sauvegarder la proposition
  const savedProposal = await newProposal.save();

  // Ajouter la proposition au paragraphe du livre
  const paragraph = await Paragraph.findOne({ book: bookId })
    .sort({ _id: -1 })
    .limit(1);
  paragraph.proposals.push(savedProposal._id);
  await paragraph.save();

  res.status(201).json({
    status: "success",
    data: {
      savedProposal,
    },
  });
};
