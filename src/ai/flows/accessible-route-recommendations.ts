'use server';

/**
 * @fileOverview A flow that recommends accessible routes based on user preferences, community ratings, and real-time vehicle availability.
 *
 * - recommendAccessibleRoute - A function that handles the route recommendation process.
 * - AccessibleRouteInput - The input type for the recommendAccessibleRoute function.
 * - AccessibleRouteOutput - The return type for the recommendAccessibleRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AccessibleRouteInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  endLocation: z.string().describe('The destination location for the route.'),
  mobilityNeeds: z
    .array(z.string())
    .describe(
      'An array of strings representing the users mobility needs (e.g., wheelchair accessible, proximity to elevators).'
    ),
});
export type AccessibleRouteInput = z.infer<typeof AccessibleRouteInputSchema>;

const AccessibleRouteOutputSchema = z.object({
  routeDescription: z
    .string()
    .describe(
      'A detailed description of the recommended route, including specific instructions and accessibility information.'
    ),
  accessibilityScore: z
    .number()
    .describe(
      'A numerical score representing the overall accessibility of the route, based on community ratings and other factors.'
    ),
  estimatedTravelTime: z
    .string()
    .describe('The estimated travel time for the recommended route.'),
});
export type AccessibleRouteOutput = z.infer<typeof AccessibleRouteOutputSchema>;

export async function recommendAccessibleRoute(
  input: AccessibleRouteInput
): Promise<AccessibleRouteOutput> {
  return recommendAccessibleRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'accessibleRoutePrompt',
  input: {schema: AccessibleRouteInputSchema},
  output: {schema: AccessibleRouteOutputSchema},
  prompt: `You are an AI assistant designed to recommend accessible routes for users with mobility needs in Nairobi.

  Based on the user's starting location, destination, and specific mobility needs, you will generate a route description, an accessibility score, and an estimated travel time.

  Consider community ratings for public transport stops (physical accessibility and staff courtesy), real-time vehicle availability, and user-specified preferences (e.g., wheelchair accessible, proximity to elevators).

  Starting Location: {{{startLocation}}}
  Destination: {{{endLocation}}}
  Mobility Needs: {{#each mobilityNeeds}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Provide a route description that includes specific instructions and accessibility information.  Provide an accessibility score out of 10. Provide an estimated travel time.
  `,
});

const recommendAccessibleRouteFlow = ai.defineFlow(
  {
    name: 'recommendAccessibleRouteFlow',
    inputSchema: AccessibleRouteInputSchema,
    outputSchema: AccessibleRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
