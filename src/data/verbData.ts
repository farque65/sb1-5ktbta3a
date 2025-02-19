export interface VerbConjugation {
  infinitive: string;
  tense: string;
  conjugations: {
    je: string;
    tu: string;
    il: string;
    nous: string;
    vous: string;
    ils: string;
  };
}

export const verbConjugations: VerbConjugation[] = [
  {
    infinitive: "être",
    tense: "présent",
    conjugations: {
      je: "suis",
      tu: "es",
      il: "est",
      nous: "sommes",
      vous: "êtes",
      ils: "sont"
    }
  },
  {
    infinitive: "être",
    tense: "imparfait",
    conjugations: {
      je: "étais",
      tu: "étais",
      il: "était",
      nous: "étions",
      vous: "étiez",
      ils: "étaient"
    }
  },
  {
    infinitive: "avoir",
    tense: "présent",
    conjugations: {
      je: "ai",
      tu: "as",
      il: "a",
      nous: "avons",
      vous: "avez",
      ils: "ont"
    }
  },
  {
    infinitive: "avoir",
    tense: "imparfait",
    conjugations: {
      je: "avais",
      tu: "avais",
      il: "avait",
      nous: "avions",
      vous: "aviez",
      ils: "avaient"
    }
  },
  {
    infinitive: "aller",
    tense: "présent",
    conjugations: {
      je: "vais",
      tu: "vas",
      il: "va",
      nous: "allons",
      vous: "allez",
      ils: "vont"
    }
  },
  {
    infinitive: "aller",
    tense: "imparfait",
    conjugations: {
      je: "allais",
      tu: "allais",
      il: "allait",
      nous: "allions",
      vous: "alliez",
      ils: "allaient"
    }
  }
];

export const commonVerbs = [
  "être",
  "avoir",
  "aller",
  "faire",
  "dire",
  "pouvoir",
  "vouloir",
  "venir",
  "voir",
  "savoir"
];

export const tenses = [
  "présent",
  "imparfait",
  "futur simple",
  "passé composé",
  "plus-que-parfait",
  "conditionnel présent"
];