const Proposal = require("../models/proposalModel");
const Book = require("../models/bookModel");

async function finDeJournee() {
  // Récupérer tous les livres
  const books = await Book.find()
    .populate({
      path: "paragraphs",
      populate: {
        path: "proposals",
        options: { sort: { likes: "desc" }, limit: 1 },
      },
    })
    .exec();

  // Pour chaque livre
  for (const book of books) {
    // Récupérer la proposition la plus likée pour le livre spécifié
    const mostLikedProposal = book.paragraphs[0].proposals[0];

    if (mostLikedProposal) {
      // Mettre à jour le livre avec le contenu de la proposition la plus likée
      book.paragraphs.push(mostLikedProposal.paragraph);

      // Réinitialiser les likes pour toutes les propositions associées au livre
      await Proposal.updateMany(
        { book: book._id },
        { $set: { current: false } }
      );

      // Sauvegarder les modifications
      //   await book.save();
    }
  }

  console.log(
    "Fin de journée - Mise à jour de tous les livres terminée avec succès."
  );
}

module.exports = finDeJournee;
