'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

const mobilityOptions = [
  { id: 'wheelchair', label: 'Wheelchair Accessible Vehicles' },
  { id: 'elevator', label: 'Routes with Elevators' },
  { id: 'ramp', label: 'Ramps at Stops/Stations' },
  { id: 'low-floor', label: 'Low-floor Buses/Matatus' },
  { id: 'staff-assist', label: 'Staff Assistance Available' },
];

const formSchema = z.object({
  startLocation: z.string().min(3, { message: 'Start location must be at least 3 characters.' }),
  endLocation: z.string().min(3, { message: 'End location must be at least 3 characters.' }),
  mobilityNeeds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one mobility need.',
  }),
});

type RecommendationFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: '',
      endLocation: '',
      mobilityNeeds: [],
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Details</CardTitle>
        <CardDescription>Enter your journey details and select your needs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="startLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Westlands" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CBD Nairobi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobilityNeeds"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Mobility Needs</FormLabel>
                  </div>
                  {mobilityOptions.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="mobilityNeeds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Recommendation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
