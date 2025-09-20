
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, OccasionContext, OutfitRecommendation, WeatherReport } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateOutfitRecommendations(profile: UserProfile, context: OccasionContext): Promise<OutfitRecommendation[]> {
  const prompt = `
    Act as an expert fashion stylist. Based on the provided user profile and context, generate three distinct outfit recommendations.

    User Profile:
    - Body Type: ${profile.bodyType}
    - Preferred Style: ${profile.style}
    - Favorite Colors: ${profile.colors.join(', ')}
    - Preferred Fit: ${profile.fit}

    Context:
    - Occasion: ${context.occasion}
    - Weather: ${context.weather}

    Your response must be a valid JSON object that adheres to the provided schema. The JSON object should be an array of outfit recommendations. Do not include any text, markdown, or backticks outside of the JSON object.
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        outfitName: {
          type: Type.STRING,
          description: "A catchy name for the outfit, e.g., 'Urban Explorer' or 'Chic Minimalist'."
        },
        description: {
          type: Type.STRING,
          description: "A brief, compelling description of the outfit's style and vibe."
        },
        items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "The name of the clothing item, e.g., 'Slim-fit Chinos'."
              },
              description: {
                type: Type.STRING,
                description: "A detailed description of the item, including color, material, and style notes."
              }
            },
            required: ["name", "description"]
          }
        }
      },
      required: ["outfitName", "description", "items"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.8,
      }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as OutfitRecommendation[];
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to parse recommendations from the AI. Please try again.");
  }
}

export async function generateWeatherReport(location: string): Promise<WeatherReport> {
  const prompt = `
    Based on the following location, generate a concise weather report for the current day.
    Location: ${location}
    Your response must be a valid JSON object that adheres to the provided schema. Do not include any text, markdown, or backticks outside of the JSON object.
    Provide the location as "City, Country". Wind speed should be in km/h. Temperature in Celsius.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      location: { type: Type.STRING },
      temperature: { type: Type.NUMBER },
      condition: { type: Type.STRING, description: "e.g., 'Partly Cloudy', 'Sunny', 'Light Rain'" },
      feelsLike: { type: Type.NUMBER },
      humidity: { type: Type.NUMBER, description: "As a percentage, e.g., 65" },
      windSpeed: { type: Type.NUMBER, description: "In km/h" },
      summary: { type: Type.STRING, description: "A brief, one-sentence summary of the day's weather." },
    },
    required: ["location", "temperature", "condition", "feelsLike", "humidity", "windSpeed", "summary"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as WeatherReport;
  } catch (error) {
    console.error("Error generating weather report:", error);
    throw new Error("Failed to get weather data from the AI.");
  }
}

export async function describePersonInImage(base64ImageDataUrl: string): Promise<string> {
    const mimeType = base64ImageDataUrl.substring(base64ImageDataUrl.indexOf(":") + 1, base64ImageDataUrl.indexOf(";"));
    const data = base64ImageDataUrl.substring(base64ImageDataUrl.indexOf(",") + 1);
    
    const imagePart = {
        inlineData: {
            mimeType: mimeType,
            data: data,
        },
    };
    const textPart = {
        text: "Briefly describe the person in this image. Focus on features relevant for generating a consistent fashion photo, like gender presentation, apparent age, ethnicity, hair style and color. Be concise, objective, and descriptive. Example: 'A young woman in her 20s with long, blonde wavy hair and fair skin.'"
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error describing person in image:", error);
        throw new Error("Failed to analyze the avatar image.");
    }
}

export async function visualizeOutfit(outfit: OutfitRecommendation, profile: UserProfile): Promise<string> {
  const detailedItems = outfit.items.map(item => `${item.name} (${item.description})`).join(', ');

  const personDescription = profile.avatarDescription 
    ? `a person who looks like this: ${profile.avatarDescription}`
    : `a person with a '${profile.bodyType}' body type`;

  const prompt = `
    Generate a photorealistic, full-body fashion photograph of ${personDescription}.
    They are wearing a stylish outfit consisting of: ${detailedItems}.
    The background should be a minimal and clean urban environment that complements the outfit.
    The lighting must be bright and natural, mimicking a high-end fashion photoshoot.
    The person should have a confident and relaxed pose, showcasing the outfit clearly.
    The image should be high-resolution and visually appealing.
  `;

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '3:4',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("The AI failed to create an image for this outfit.");
  }
}
