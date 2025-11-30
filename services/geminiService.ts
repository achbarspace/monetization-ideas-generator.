
import { GoogleGenAI, Type } from "@google/genai";
import type { Idea } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    ideas: {
      type: Type.ARRAY,
      description: "Une liste de 5 idées de monétisation.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: {
            type: Type.STRING,
            description: "La catégorie de la stratégie de monétisation.",
            enum: ["Publicité", "Abonnements", "E-commerce", "Affiliation", "Services", "Contenu Premium", "Autre"]
          },
          title: {
            type: Type.STRING,
            description: "Un titre concis pour l'idée."
          },
          description: {
            type: Type.STRING,
            description: "Une explication détaillée de l'idée, comment la mettre en œuvre, et ses avantages potentiels."
          }
        },
        required: ["category", "title", "description"]
      }
    }
  },
  required: ["ideas"]
};

export const generateMonetizationIdeas = async (url: string): Promise<Idea[]> => {
  try {
    const prompt = `Agis comme un consultant expert en monétisation de sites web. Pour le site web à l'adresse suivante : ${url}, génère 5 idées créatives et actionnables pour augmenter ses revenus. Pour chaque idée, fournis un titre, une description détaillée expliquant la mise en œuvre et les avantages, et une catégorie. Formate ta réponse en JSON en suivant le schéma fourni.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);

    if (parsedResponse && parsedResponse.ideas) {
      return parsedResponse.ideas as Idea[];
    } else {
      throw new Error("La réponse de l'API est malformée.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Impossible de générer des idées de monétisation.");
  }
};
