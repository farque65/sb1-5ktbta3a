import React, { useState, useMemo } from 'react';
import { Book, Search, ArrowLeft } from 'lucide-react';
import { verbConjugations, commonVerbs, tenses, VerbConjugation } from '../data/verbData';

const Bescherelle = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerb, setSelectedVerb] = useState('');
  const [selectedTense, setSelectedTense] = useState('');

  const filteredVerbs = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return commonVerbs.filter(verb => verb.toLowerCase().includes(term));
  }, [searchTerm]);

  const filteredConjugations = useMemo(() => {
    return verbConjugations.filter(conj => 
      (!selectedVerb || conj.infinitive === selectedVerb) &&
      (!selectedTense || conj.tense === selectedTense)
    );
  }, [selectedVerb, selectedTense]);

  const handleVerbSelect = (verb: string) => {
    setSelectedVerb(verb);
    setSelectedTense('');
  };

  const handleTenseSelect = (tense: string) => {
    setSelectedTense(tense);
    setSelectedVerb('');
  };

  const renderConjugationCard = (conjugation: VerbConjugation) => (
    <div key={`${conjugation.infinitive}-${conjugation.tense}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{conjugation.infinitive}</h3>
          <p className="text-gray-600">{conjugation.tense}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-medium">je</span> {conjugation.conjugations.je}</p>
          <p className="text-gray-700"><span className="font-medium">tu</span> {conjugation.conjugations.tu}</p>
          <p className="text-gray-700"><span className="font-medium">il/elle</span> {conjugation.conjugations.il}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-medium">nous</span> {conjugation.conjugations.nous}</p>
          <p className="text-gray-700"><span className="font-medium">vous</span> {conjugation.conjugations.vous}</p>
          <p className="text-gray-700"><span className="font-medium">ils/elles</span> {conjugation.conjugations.ils}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-white hover:text-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white text-center flex items-center gap-3">
            <Book className="w-8 h-8" />
            Digital Bescherelle
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Search and Verbs */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search verbs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredVerbs.map((verb) => (
                <button
                  key={verb}
                  onClick={() => handleVerbSelect(verb)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedVerb === verb
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {verb}
                </button>
              ))}
            </div>
          </div>

          {/* Tenses */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tenses</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tenses.map((tense) => (
                <button
                  key={tense}
                  onClick={() => handleTenseSelect(tense)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedTense === tense
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {tense}
                </button>
              ))}
            </div>
          </div>

          {/* Conjugations */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedVerb
                ? `Conjugations for "${selectedVerb}"`
                : selectedTense
                ? `Verbs in "${selectedTense}"`
                : 'Select a verb or tense'}
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredConjugations.map(renderConjugationCard)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bescherelle;