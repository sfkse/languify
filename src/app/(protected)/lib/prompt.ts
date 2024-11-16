const languageSpecifics: Record<string, any> = {
  english: {
    name: "English",
    grammarFocus: {
      A1: "basic subject-verb-object, present simple, basic past",
      A2: "present/past simple and continuous, future 'going to'",
      B1: "present perfect, conditionals type 1",
      B2: "all tenses, passive voice, conditionals",
      C1: "all complex structures, subjunctive, idioms",
    },
    culturalNotes: "Focus on international English standards",
  },
  swedish: {
    name: "Swedish",
    grammarFocus: {
      A1: "basic word order (V2), present tense, en/ett articles, basic pronouns",
      A2: "past tense, perfect tense, definite/indefinite forms, modal verbs",
      B1: "relative clauses, passive voice, future expressions, conjunctions",
      B2: "participles, advanced word order, subjunctive, s-passive",
      C1: "all verb forms, advanced particles, idiomatic expressions",
    },
    specificFeatures: {
      A1: {
        grammar: [
          "en/ett nouns",
          "simple present tense",
          "basic pronouns (jag, du, han, hon, det, den)",
          "basic questions",
          "V2 word order in main clauses",
        ],
        vocabulary: [
          "everyday objects",
          "basic numbers",
          "colors",
          "family members",
          "simple time expressions",
        ],
      },
      A2: {
        grammar: [
          "definite/indefinite forms",
          "preteritum (past tense)",
          "perfect tense",
          "modal verbs (kan, ska, måste)",
          "adjective agreement",
        ],
        vocabulary: [
          "weather expressions",
          "common verbs with particles",
          "basic phrasal verbs",
          "time and date",
        ],
      },
      B1: {
        grammar: [
          "subordinate clauses",
          "relative pronouns (som, vilket, vars)",
          "passive voice",
          "future tense constructions",
        ],
        vocabulary: [
          "common idioms",
          "professional terminology",
          "abstract concepts",
          "formal/informal expressions",
        ],
      },
      B2: {
        grammar: [
          "advanced particle verbs",
          "s-passive vs blive-passive",
          "complex subordinate clauses",
          "participle constructions",
        ],
        vocabulary: [
          "advanced idioms",
          "academic vocabulary",
          "stylistic variations",
          "regional expressions",
        ],
      },
      C1: {
        grammar: [
          "all tense combinations",
          "advanced syntax patterns",
          "archaic forms",
          "literary constructions",
        ],
        vocabulary: [
          "specialized terminology",
          "dialectal variations",
          "literary expressions",
          "sophisticated style markers",
        ],
      },
    },
    culturalNotes:
      "Consider Swedish cultural context and 'du-reformen' in formal/informal address",
  },
};

const getLevelGuidelines = (level: string, language: string) => {
  const baseGuidelines: Record<string, any> = {
    A1: {
      vocabulary: "basic vocabulary, high-frequency words only",
      sentenceLength: "very short (5-8 words)",
      connectors: "and, but, because",
      complexity: "extremely simple structures",
    },
    A2: {
      vocabulary: "basic vocabulary with common expressions",
      sentenceLength: "short (8-10 words)",
      connectors: "and, but, because, so, then",
      complexity: "simple structures with basic combinations",
    },
    B1: {
      vocabulary: "intermediate vocabulary, common idioms",
      sentenceLength: "medium (10-15 words)",
      connectors: "however, therefore, although",
      complexity: "moderate complexity allowed",
    },
    B2: {
      vocabulary: "advanced vocabulary, idioms",
      sentenceLength: "longer (15-20 words)",
      connectors: "nevertheless, furthermore, meanwhile",
      complexity: "complex structures allowed",
    },
    C1: {
      vocabulary: "sophisticated vocabulary, rare words, colloquialisms",
      sentenceLength: "unrestricted",
      connectors: "all advanced connectors",
      complexity: "highly complex structures",
    },
  };

  return {
    ...baseGuidelines,
    grammarFocus:
      languageSpecifics[language].grammarFocus[level] ||
      languageSpecifics[language]?.specificFeatures[level]?.grammar,
  };
};

const getSwedishSpecificGuidelines = (level: string) => {
  const features =
    languageSpecifics.swedish.specificFeatures[
      level as keyof typeof languageSpecifics.swedish.specificFeatures
    ];
  return {
    grammarPoints: features.grammar.join(", "),
    vocabularyFocus: features.vocabulary.join(", "),
  };
};

export const createPrompt = (
  text: string,
  level: string,
  targetLanguage: string
) => {
  const guidelines: Record<string, any> = getLevelGuidelines(
    level,
    targetLanguage
  );
  const langSpecifics =
    languageSpecifics[targetLanguage as keyof typeof languageSpecifics];

  // Special handling for Swedish
  const swedishSpecifics =
    targetLanguage === "swedish" ? getSwedishSpecificGuidelines(level) : null;

  return [
    {
      role: "system",
      content: `You are an expert ${langSpecifics.name} language educator specializing in adapting texts for different proficiency levels according to CEFR standards. ${langSpecifics.culturalNotes}. Only respond with the rephrased text.`,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Rephrase the following text in ${
            langSpecifics.name
          } for ${level} level learners:
              Original text: ${text}
  
              Guidelines for ${level} level ${langSpecifics.name}:
              - Use ${guidelines.vocabulary}
              - Keep sentences ${guidelines.sentenceLength}
              - Grammar focus: ${guidelines.grammarFocus}
              - Use these connectors: ${guidelines.connectors}
              - Complexity level: ${guidelines.complexity}
              
              ${
                targetLanguage === "swedish"
                  ? `
              Swedish-specific requirements:
              - Grammar points to include: ${swedishSpecifics?.grammarPoints}
              - Vocabulary focus areas: ${swedishSpecifics?.vocabularyFocus}
              - Follow Swedish word order rules (V2)
              - Use appropriate definite/indefinite forms
              - Consider en/ett gender system
              `
                  : ""
              }
  
              Language-specific requirements:
              - Use appropriate ${langSpecifics.name} syntax and word order
              - Consider ${
                langSpecifics.name
              }-specific expressions and cultural context
              - Maintain natural flow in ${langSpecifics.name}
              
              Additional requirements:
              - Maintain the core meaning of the original text
              - Ensure clarity and coherence
              - Keep the tone appropriate for the level
              - Avoid vocabulary or structures above ${level} level
              
              Please provide the rephrased version in ${
                langSpecifics.name
              } suitable for ${level} level learners.`,
        },
      ],
    },
  ];
};

