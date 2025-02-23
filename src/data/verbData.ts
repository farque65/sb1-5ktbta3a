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
		infinitive: 'être',
		tense: 'présent',
		conjugations: {
			je: 'suis',
			tu: 'es',
			il: 'est',
			nous: 'sommes',
			vous: 'êtes',
			ils: 'sont',
		},
	},
	{
		infinitive: 'être',
		tense: 'imparfait',
		conjugations: {
			je: 'étais',
			tu: 'étais',
			il: 'était',
			nous: 'étions',
			vous: 'étiez',
			ils: 'étaient',
		},
	},
	{
		infinitive: 'avoir',
		tense: 'présent',
		conjugations: {
			je: 'ai',
			tu: 'as',
			il: 'a',
			nous: 'avons',
			vous: 'avez',
			ils: 'ont',
		},
	},
	{
		infinitive: 'avoir',
		tense: 'imparfait',
		conjugations: {
			je: 'avais',
			tu: 'avais',
			il: 'avait',
			nous: 'avions',
			vous: 'aviez',
			ils: 'avaient',
		},
	},
	{
		infinitive: 'aller',
		tense: 'présent',
		conjugations: {
			je: 'vais',
			tu: 'vas',
			il: 'va',
			nous: 'allons',
			vous: 'allez',
			ils: 'vont',
		},
	},
	{
		infinitive: 'aller',
		tense: 'imparfait',
		conjugations: {
			je: 'allais',
			tu: 'allais',
			il: 'allait',
			nous: 'allions',
			vous: 'alliez',
			ils: 'allaient',
		},
	},
	{
		infinitive: 'reduire',
		tense: 'présent',
		conjugations: {
			je: 'réduis',
			tu: 'réduis',
			il: 'réduit',
			nous: 'réduisons',
			vous: 'réduisez',
			ils: 'réduisent',
		},
	},
	{
		infinitive: "s'abattre",
		tense: 'présent',
		conjugations: {
			je: "m'abats",
			tu: "t'abats",
			il: "s'abat",
			nous: 'nous abattons',
			vous: 'vous abattez',
			ils: "s'abattent",
		},
	},
	{
		infinitive: "s'abattre",
		tense: 'imparfait',
		conjugations: {
			je: "m'abattais",
			tu: "t'abattais",
			il: "s'abattait",
			nous: 'nous abattions',
			vous: 'vous abattiez',
			ils: "s'abattaient",
		},
	},
	{
		infinitive: "s'abattre",
		tense: 'passé simple',
		conjugations: {
			je: "m'abattis",
			tu: "t'abattis",
			il: "s'abattit",
			nous: 'nous abattîmes',
			vous: 'vous abattîtes',
			ils: "s'abattirent",
		},
	},
	{
		infinitive: "s'abattre",
		tense: 'futur simple',
		conjugations: {
			je: "m'abattrai",
			tu: "t'abattras",
			il: "s'abattra",
			nous: 'nous abattrons',
			vous: 'vous abattrez',
			ils: "s'abattront",
		},
	},
	{
		infinitive: 'faillir',
		tense: 'présent',
		conjugations: {
			je: 'faillis',
			tu: 'faillis',
			il: 'faillit',
			nous: 'faillissons',
			vous: 'faillissez',
			ils: 'faillissent',
		},
	},
	{
		infinitive: 'faillir',
		tense: 'imparfait',
		conjugations: {
			je: 'faillissais',
			tu: 'faillissais',
			il: 'faillissait',
			nous: 'faillissions',
			vous: 'faillissiez',
			ils: 'faillissaient',
		},
	},
	{
		infinitive: 'faire',
		tense: 'présent',
		conjugations: {
			je: 'fais',
			tu: 'fais',
			il: 'fait',
			nous: 'faisons',
			vous: 'faites',
			ils: 'font',
		},
	},
	{
		infinitive: 'faire',
		tense: 'imparfait',
		conjugations: {
			je: 'faisais',
			tu: 'faisais',
			il: 'faisait',
			nous: 'faisions',
			vous: 'faisiez',
			ils: 'faisaient',
		},
	},
];

export const commonVerbs = [
	"s'abattre",
	'aller',
	'avoir',
	'dire',
	'être',
	'faire',
	'reduire',
	'savoir',
	'pouvoir',
	'vouloir',
	'voir',
	'devoir',
	'mettre',
	'prendre',
	'comprendre',
	'apprendre',
	'boire',
	'croire',
	'recevoir',
	'lire',
	'rire',
	'écrire',
	'connaître',
	'paraître',
	'plaire',
	'aimer',
	'avoir',
	'venir',
];

export const tenses = [
	'présent',
	'imparfait',
	'futur simple',
	'futur antérieur',
	'passé composé',
	'plus-que-parfait',
	'conditionnel présent',
];
