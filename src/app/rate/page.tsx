'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Mic, Smile, Accessibility } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ratingSchema = z.object({
  location: z.string().min(3, 'Location is required.'),
  physicalAccessRating: z.number().min(1, "Please provide a rating.").max(5),
  staffCourtesyRating: z.number().min(1, "Please provide a rating.").max(5),
  comments: z.string().optional(),
});

type RatingFormValues = z.infer<typeof ratingSchema>;

const StarRating = ({ value, onValueChange }: { value: number, onValueChange: (value: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`cursor-pointer transition-colors h-8 w-8 ${
          star <= value ? 'text-accent fill-accent' : 'text-muted-foreground'
        }`}
        onClick={() => onValueChange(star)}
      />
    ))}
  </div>
);

export default function RatePage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const form = useForm<RatingFormValues>({
        resolver: zodResolver(ratingSchema),
        defaultValues: {
            location: '',
            physicalAccessRating: 0,
            staffCourtesyRating: 0,
            comments: '',
        },
    });

    function onSubmit(values: RatingFormValues) {
        console.log(values);
        setIsSubmitted(true);
        toast({
            title: "Rating Submitted!",
            description: "Thank you for your feedback.",
        })
    }
    
    if (isSubmitted) {
        return (
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 items-center justify-center">
                 <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Thank You!</CardTitle>
                        <CardDescription>Your rating has been submitted successfully.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">You are helping make transport more accessible for everyone.</p>
                        <Button onClick={() => {
                            setIsSubmitted(false);
                            form.reset();
                        }}>Submit Another Rating</Button>
                    </CardContent>
                </Card>
            </main>
        )
    }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Header
        title="Rate a Stop (Matatu Mate)"
        description="Your feedback helps improve accessibility for the entire community."
      >
        <Button variant="outline">
          <Mic className="mr-2" />
          Voice Input
        </Button>
      </Header>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Submit a Rating</CardTitle>
          <CardDescription>Rate a public transport stop or vehicle.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location / Stop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Kencom House Bus Stop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="physicalAccessRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-semibold">
                        <Accessibility />
                        Physical Accessibility Rating
                    </FormLabel>
                    <FormControl>
                      <StarRating value={field.value} onValueChange={field.onChange} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="staffCourtesyRating"
                render={({ field }) => (
                  <FormItem>
                     <FormLabel className="flex items-center gap-2 font-semibold">
                        <Smile />
                        Staff Courtesy & Dignity Rating
                    </FormLabel>
                    <FormControl>
                      <StarRating value={field.value} onValueChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any other details? e.g., 'Driver was very helpful.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Submit Rating</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
