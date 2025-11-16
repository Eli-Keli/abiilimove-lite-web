'use client';

import type { AccessibleRouteOutput } from '@/ai/flows/accessible-route-recommendations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, Footprints } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type RecommendationResultProps = {
  recommendation: AccessibleRouteOutput;
};

export function RecommendationResult({ recommendation }: RecommendationResultProps) {
  const accessibilityPercentage = recommendation.accessibilityScore * 10;

  return (
    <Card className="animate-in fade-in-50">
      <CardHeader>
        <CardTitle>Your Accessible Route</CardTitle>
        <CardDescription>Here is the recommended route based on your preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Route Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <Clock className="size-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Est. Travel Time</p>
                        <p className="font-bold text-lg">{recommendation.estimatedTravelTime}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <Star className="size-6 text-accent" />
                     <div>
                        <p className="text-sm text-muted-foreground">Accessibility Score</p>
                        <p className="font-bold text-lg">{recommendation.accessibilityScore} / 10</p>
                    </div>
                </div>
            </div>
             <div>
                <p className="text-sm font-medium mb-2">Overall Score</p>
                <Progress value={accessibilityPercentage} aria-label={`${accessibilityPercentage}% accessible`} />
            </div>
        </div>

        <Separator />

        <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Footprints className="text-primary"/> Step-by-step Guide</h3>
            <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                {recommendation.routeDescription.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
