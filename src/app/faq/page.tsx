
import { PageHeader } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
      question: "Is cataract surgery painful?",
      answer: "No, cataract surgery is not painful. We use anesthetic eye drops to completely numb your eye before and during the procedure, so you will feel no pain, only light pressure at most."
    },
    {
      question: "How long is the recovery?",
      answer: "Recovery is very quick. Most patients notice clearer vision within 24 hours. You can typically resume normal, non-strenuous activities the next day. A full recovery usually takes about a month."
    },
    {
      question: "Will I need glasses after surgery?",
      answer: "This depends on the type of intraocular lens (IOL) you choose. With standard monofocal lenses, you will likely need reading glasses. With premium multifocal or EDOF lenses, your dependence on glasses can be significantly reduced or even eliminated."
    },
    {
      question: "What are the risks of cataract surgery?",
      answer: "Cataract surgery is one of the safest surgical procedures performed today. However, like any surgery, it has potential risks, such as infection, inflammation, bleeding, or retinal detachment. These are rare and are discussed in detail during your consultation."
    },
    {
      question: "How do I know if I have a cataract?",
      answer: "Common symptoms include blurry or cloudy vision, faded colors, glare or halos around lights, and poor night vision. A comprehensive eye exam is the only way to be certain."
    },
    {
      question: "How long does the surgery take?",
      answer: "The procedure itself is very quick, typically lasting only 10-15 minutes. However, you should plan to be at the surgical center for 2-3 hours to allow for preparation and immediate post-operative care."
    }
  ];

export default function FAQPage() {
  return (
    <div className="flex flex-col gap-8 py-8 md:py-16">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about cataract surgery and eye health."
      />
      <div className="max-w-4xl mx-auto w-full">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card multicolor-shadow border p-2 rounded-lg">
              <AccordionTrigger className="p-4 text-lg font-medium text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <p className="text-muted-foreground text-base font-light">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
