'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { RecommendationForm } from './recommendation-form';
import { RecommendationResult } from './recommendation-result';
import type { AccessibleRouteOutput } from '@/ai/flows/accessible-route-recommendations';
import { getRecommendation } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Route } from 'lucide-react';

export default function RecommendationsPage() {
  const [recommendation, setRecommendation] = useState<AccessibleRouteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: { startLocation: string; endLocation: string; mobilityNeeds: string[] }) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getRecommendation(data);
      if (result) {
        setRecommendation(result);
      } else {
        throw new Error('Failed to get recommendation.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate route recommendation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Header
        title="Plan an Accessible Route"
        description="Get AI-powered route recommendations tailored to your needs."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RecommendationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-2">
          {isLoading && (
            <Card>
              <CardContent className="flex h-96 items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-muted-foreground">Generating your accessible route...</p>
                </div>
              </CardContent>
            </Card>
          )}
          {recommendation && <RecommendationResult recommendation={recommendation} />}
          {!isLoading && !recommendation && (
             <Card>
                <CardContent className="flex h-96 items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <Route size={48} className="mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">Ready to Roll?</h3>
                        <p>Fill out the form to get your personalized route.</p>
                    </div>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
