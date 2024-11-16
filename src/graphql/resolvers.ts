import type { ApolloCache, ApolloClientOptions } from "@apollo/client";
import OpenAI from "openai";
import { getDopamineActivitiesPrompt, getEventsPrompt, getLocationsPrompt } from "./api";
import type { Params } from "./types";
import { orderBy } from "lodash";



async function askChatGPT(apiKey: string, prompt: string) {
  const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey
  });
  const response = await client.chat.completions.create({
    // model: "gpt-4o",
    model: 'gpt-3.5-turbo',
    messages: [{
      role: "user",
      content: prompt
    }],
    temperature: 0.2,
    top_p: 1,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices?.[0]?.message?.content || '{}') || {};
}


export const resolvers: ApolloClientOptions<ApolloCache<object>>['resolvers'] = {
  Query: {
    activities: async (_, variables: { params: Params }, ctx) => {
      const { apiKey } = ctx;
      const response = await askChatGPT(apiKey, getDopamineActivitiesPrompt(variables.params))
      return response?.activities || [];
    },
    events: async (_, variables: { params: Params }, ctx) => {
      const { apiKey } = ctx;
      const locations = await askChatGPT(apiKey, getLocationsPrompt(variables.params.area || '', variables.params.radius || 50));
      const response = await askChatGPT(apiKey, getEventsPrompt({ ...variables.params, area: locations?.locations?.join(', ') }));
      return orderBy(response?.events || [], 'datetime');
    },
  },
}