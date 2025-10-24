
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  question: z.string().min(10, { message: "Question must be at least 10 characters." }),
});

export default function AskTheSurgeonPage() {
    const { toast } = useToast();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            question: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values); // In a real app, you'd send this to a server
        toast({
            title: "Question Submitted!",
            description: "Thank you for your question. Dr. Dutta or his team will get back to you as soon as possible.",
        });
        setIsSubmitted(true);
        form.reset();
    }


  return (
    <div className="flex flex-col gap-8 py-8 md:py-16">
      <PageHeader
        title="Ask the Surgeon"
        description="Have a non-urgent question? Fill out the form below."
      />
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
            <Card className='multicolor-shadow'>
                <CardHeader>
                    <CardTitle>Submit Your Question</CardTitle>
                    <CardDescription>Dr. Dutta or a member of his team will respond to you via email.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                         <div className="flex flex-col items-center justify-center text-center p-8 bg-accent rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                            <p className="text-muted-foreground mb-4">Your question has been received. We will get back to you shortly.</p>
                            <Button onClick={() => setIsSubmitted(false)}>Ask Another Question</Button>
                        </div>
                    ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john.doe@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Question</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Please type your question here..." {...field} rows={6} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Submitting..." : "Submit Question"}
                            </Button>
                        </form>
                    </Form>
                    )}
                </CardContent>
            </Card>
        </div>
        <div className='space-y-6'>
            <Alert variant="destructive" className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Important Disclaimer</AlertTitle>
                <AlertDescription>
                    This service is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Do not use this form for urgent medical issues. If you are experiencing a medical emergency, please call your local emergency services immediately.
                </AlertDescription>
            </Alert>
             <Card className='bg-background'>
                <CardHeader>
                    <CardTitle className='text-lg'>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-sm text-muted-foreground'>We strive to answer all questions within 2-3 business days. Thank you for your patience.</p>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
