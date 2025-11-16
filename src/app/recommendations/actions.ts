'use server';

import { recommendAccessibleRoute } from '@/ai/flows/accessible-route-recommendations';
import type { AccessibleRouteInput } from '@/ai/flows/accessible-route-recommendations';

export async function getRecommendation(input: AccessibleRouteInput) {
    try {
        const result = await recommendAccessibleRoute(input);
        return result;
    } catch (error) {
        console.error("Error in getRecommendation server action:", error);
        return null;
    }
}
