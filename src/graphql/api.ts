import { getTimeRange } from '../utils';
import { type Params, TimeFrame } from './types';

export function getLocationsPrompt(area: string, radius: number) {
  return `Please provide a list of locations to look for events in within a ${radius}km radius of ${area}. Always include the name of the greater area if there is one, e.g Sunshine Coast, or Brisbane. Respond with a JSON array of strings.

  Example JSON format:

  { "locations": ["Sunshine Coast", "Noosa", "Maroochydore", "Caloundra"] }

  Do not include any text outside the JSON object.
  `;
}

export function getEventsPrompt(params: Params) {
  const { timeframe, area, categories, limit } = params;

  const [fromDate, toDate] = getTimeRange(timeframe || TimeFrame.Week);

  return `Please provide a list of ${limit || 15} events in JSON format happening near ${area} between ${fromDate.toISODate()} to ${toDate.toISODate()}. ${categories ? `The events should match any of the following categories: ${categories?.map((c) => `"${c}"`).join(', ')}" category` : ''}. Each event should include the following details:
	•	Title: Name of the event
	•	Datetime: Event date/time as an ISO8601 formatted string
  • Distance: Distance from the requested area in km
  • Duration: Estimated time of the event
  • Cost: How much the event costs, if it costs anything. Otherwise "FREE".
	•	Location: Venue or location name and address
	•	Description: Brief description of the event
	•	Category: Event type or category, for example: food, music, sports, arts, cultural, comedy, cinema, music, nature, etc. Can only have ONE category.
	•	Link: URL or link to find more details

  Example JSON format:
  {
   "events": [{
      "title": "Farmers Market",
      "datetime": "2024-11-16T08:00:00",
      "cost": "$30",
      "duration": "5h",
      "location": "Sunshine Coast Farmers Market, Fisherman's Road, Maroochydore",
      "description": "A local market with fresh produce, handmade goods, and live music.",
      "category": "food",
      "link": "https://sunshinecoastmarkets.com"
      },
      ...
    ]
  }

  There should be ${limit} results in the list.

  Please only include events that are within the specified radius, ${categories ? 'categories,' : ''} and timeframe.`
}

export function getDopamineActivitiesPrompt(params: Params) {
  const { limit, categories, area } = params;

  return `
    I want to create a "Dopamine Menu" in JSON format — a list of activities categorized by time or effort required, designed to boost mood, motivation, or energy. The activities should include a mix of physical, mental, creative, and relaxing options. Please organize them into three types:

    1. **Quick Boosts (5–10 minutes)**: Low-effort tasks that provide a quick mental or physical boost.
    2. **Moderate Activities (15–30 minutes)**: Slightly more engaging activities that help me recharge or feel productive.
    3. **Deep Engagement (1–2+ hours)**: High-effort or immersive tasks for prolonged satisfaction or accomplishment.

    ${area ? `Activities should be activities that can be done in the ${area} area.` : ''}
    ${categories ? `Tailor the activities to my preferences: ${categories?.join(', ')}` : ''}. Ensure the menu is actionable and include specific examples for each type.

    Output the response in JSON format like this:

    {
     "activities": [
      { "title": "Activity name", "description": "Brief description of the activity", "type": "quick_boost" },
      { "title": "Activity name", "description": "Brief description of the activity", "type": "moderate_activities" },
      { "title": "Activity name", "description": "Brief description of the activity", "type": "deep_engagement" }
     ]
    }

    There should be ${limit} results in the list.

    Do not include any text outside the JSON object.
  `
}
