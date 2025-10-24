
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
    Award,
    ArrowDown,
    ChevronDown,
    MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from '@/components/ui/scroll-area';

const HomePage = () => {
    const lenisRef = useRef<Lenis | null>(null);
    const isDesktop = typeof window !== 'undefined' ? window.matchMedia("(min-width: 1024px)").matches : true;

  useEffect(() => {
    gsap.set('body', { visibility: 'visible' });

    function setupSmoothScrolling() {
        const lenis = new Lenis();
        lenisRef.current = lenis;
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
            if (href) {
                lenis.scrollTo(href);
            }
          });
        });
    }

    function setupAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        gsap.from('.hero-title .split-char', { duration: 1, y: 110, opacity: 0, stagger: 0.05, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-subtitle', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.5 });
        gsap.from('.hero-scroll-indicator', { duration: 1, y: 20, opacity: 0, ease: 'power3.out', delay: 0.8 });

        // General item fade-in animation
        document.querySelectorAll('.animate-item').forEach(i => gsap.from(i, {
            opacity: 0, y: 50, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: i as Element, start: 'top 85%', toggleActions: 'play none none none' }
        }));
        
        // General text line reveal animation
        document.querySelectorAll('.animate-text p').forEach(p => {
             gsap.from(p, {
                y: '100%', opacity: 0, duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: p.parentElement as Element, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });

        // Image reveal animation
        document.querySelectorAll('.animate-image-reveal').forEach(img => {
            gsap.fromTo(img, 
                { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 }, 
                { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'power4.out',
                  scrollTrigger: { trigger: img as Element, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });

        // Philosophy section parallax
        gsap.fromTo('.philosophy-image-1', { y: 50 }, { y: -50, scrollTrigger: { trigger: '#philosophy', start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo('.philosophy-image-2', { y: -25 }, { y: 25, scrollTrigger: { trigger: '#philosophy', start: 'top bottom', end: 'bottom top', scrub: true } });
        
        // Horizontal scroll for procedures
        ScrollTrigger.matchMedia({ "(min-width: 1024px)": function() {
            const section = document.querySelector('.horizontal-scroll-section') as HTMLElement;
            const panels = gsap.utils.toArray('.procedure-panel');
            if(!section || panels.length === 0) return;

            const scrollWidth = section.offsetWidth - window.innerWidth;

            gsap.to(section, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: ".pin-container",
                    pin: true,
                    scrub: 1,
                    end: () => `+=${scrollWidth}`
                }
            });
        }});

        // FAQ open/close icon rotation
        document.querySelectorAll('.faq-item').forEach(item => {
            const summary = item.querySelector('summary');
            if (summary) {
                summary.addEventListener('click', () => {
                    item.hasAttribute('open') 
                        ? item.removeAttribute('data-open')
                        : item.setAttribute('data-open', 'true');
                });
            }
        });
    }

    function setupChatbot() {
        const bubble = document.getElementById('chatbot-bubble');
        const windowEl = document.getElementById('chatbot-window');
        const messagesEl = document.getElementById('chat-messages');
        const optionsEl = document.getElementById('chat-options');
        if (!bubble || !windowEl || !messagesEl || !optionsEl) return;
        
        let isOpen = false;
        
        type ChatNode = {
            bot: string;
            opts: { text: string; next: string }[]
        };

        const tree: Record<string, ChatNode> = {
            'start': { bot: 'Hello! How can I help?', opts: [{ text: 'About cataract surgery', next: 'cataract' }, { text: 'Recovery times', next: 'recovery' }] },
            'cataract': { bot: 'Cataract surgery is a quick, painless procedure to replace the cloudy natural lens of the eye with a clear artificial one.', opts: [{ text: 'Is it safe?', next: 'safe' }, { text: 'Main menu', next: 'start' }] },
            'safe': { bot: 'Absolutely. It is one of the safest and most common surgeries performed worldwide.', opts: [{ text: 'Thanks!', next: 'thanks' }, { text: 'Main menu', next: 'start' }] },
            'recovery': { bot: 'Most patients experience clearer vision within 24 hours and can resume normal activities the next day.', opts: [{ text: 'That\'s great!', next: 'thanks' }, { text: 'Main menu', next: 'start' }] },
            'thanks': { bot: 'You\'re welcome! Is there anything else?', opts: [{ text: 'Start over', next: 'start' }] }
        };

        const addMsg = (text: string, sender: 'user' | 'bot') => {
            const div = document.createElement('div');
            div.className = `chat-message ${sender} flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
            const p = document.createElement('p');
            p.className = `text-sm font-light rounded-lg py-2 px-3 max-w-xs`;
            p.textContent = text;
            if(sender === 'bot') {
                p.classList.add('bg-muted', 'text-muted-foreground');
            } else {
                p.classList.add('bg-primary', 'text-primary-foreground');
            }
            div.appendChild(p);
            messagesEl.appendChild(div);
            const scrollAreaViewport = messagesEl.parentElement?.parentElement;
            if (scrollAreaViewport) {
              scrollAreaViewport.scrollTop = scrollAreaViewport.scrollHeight;
            }
        };

        const handleOptClick = (opt: {text: string; next: string}) => {
            addMsg(opt.text, 'user');
            optionsEl.innerHTML = '<p class="text-center text-xs text-muted-foreground animate-pulse">Bot is typing...</p>';
            setTimeout(() => {
                const next = tree[opt.next];
                addMsg(next.bot, 'bot');
                if (next.opts) showOpts(next.opts); else optionsEl.innerHTML = '';
            }, 1200);
        };

        const showOpts = (opts: {text: string; next: string}[]) => {
            optionsEl.innerHTML = '';
            opts.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'w-full text-left p-2 bg-background/50 hover:bg-accent rounded-lg transition-colors text-sm font-normal text-primary';
                btn.textContent = opt.text;
                btn.onclick = () => handleOptClick(opt);
                optionsEl.appendChild(btn);
            });
        };

        bubble.addEventListener('click', () => {
            isOpen = !isOpen;
            windowEl.style.opacity = isOpen ? '1' : '0';
            windowEl.style.transform = isOpen ? 'scale(1)' : 'scale(0.95)';
            windowEl.style.pointerEvents = isOpen ? 'auto' : 'none';
        });

        showOpts(tree.start.opts);
    }
    
    setupSmoothScrolling();
    setupAnimations();
    setupChatbot();

    return () => {
        if (lenisRef.current) {
            lenisRef.current.destroy();
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [isDesktop]);

  const titleChars = "Clarity in Vision".split('');

  const testimonials = [
    {
      name: "P. Sharma",
      text: "Dr. Dutta gave me my vision back. The world is vibrant and clear again. I haven't seen this well in decades. The process was seamless and reassuring."
    },
    {
      name: "A. Khan",
      text: "The level of professionalism and care is second to none. I chose a multifocal lens and now I can read and see distances without glasses. It's incredible."
    },
    {
      name: "R. Iyer",
      text: "The laser cataract surgery was completely painless and so precise. Dr. Dutta and his team are true experts. I recommend them to everyone."
    },
    {
      name: "S. Gupta",
      text: "From consultation to post-op, the entire journey was flawless. The attention to detail is remarkable. My vision is better than it has ever been."
    }
  ];

  const journeySteps = [
    {
      title: 'Consultation',
      description: 'A comprehensive discussion and eye examination to determine the best course of action for your vision.'
    },
    {
      title: 'Advanced Biometry',
      description: 'We use state-of-the-art scanners to take precise measurements of your eye for IOL power calculation.'
    },
    {
      title: 'Day of Surgery',
      description: 'A quick, painless procedure performed in a sterile, comfortable environment with immediate vision improvement.'
    },
    {
      title: 'Post-Operative Care',
      description: 'We provide a clear schedule of follow-up visits and eye drops to ensure a smooth and successful recovery.'
    }
  ];
  
  const awards = [
    {
      title: 'Global Ophthalmology Leadership Award',
      issuer: 'World Vision Congress',
      year: 2023,
    },
    {
      title: 'Innovator in Surgical Technology',
      issuer: 'Advanced Ophthalmic Society',
      year: 2021,
    },
    {
      title: 'Top 100 Influential Ophthalmologists',
      issuer: 'The Ophthalmologist Power List',
      year: 2020,
    },
    {
      title: 'President\'s Gold Medal',
      issuer: 'National Board of Ophthalmology',
      year: 2018,
    },
  ];

  return (
    <>
        <main id="smooth-wrapper">
          <div id="smooth-content">
            <section id="hero" className="h-screen w-full flex flex-col justify-center items-center text-center relative px-4">
                <div className="z-10">
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold hero-title tracking-tight text-foreground">
                        {titleChars.map((char, index) => (
                           char === ' ' ? <span key={index}>&nbsp;</span> : <span key={index} className="split-char">{char}</span>
                        ))}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-6 max-w-3xl mx-auto hero-subtitle font-light">Advancing ophthalmic excellence through innovative cataract surgery and dedicated patient care.</p>
                </div>
                <a href="#about" className="absolute bottom-10 text-muted-foreground flex flex-col items-center hero-scroll-indicator z-10 font-light group">
                    <span>Scroll to Explore</span>
                    <ArrowDown className="mt-2 transition-transform group-hover:translate-y-1" />
                </a>
            </section>
            
            <div className="animate-item">
                <section id="about" className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16 text-foreground">About Dr. Dutta</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                            <div className="lg:col-span-2 image-reveal-container rounded-xl multicolor-shadow">
                                <Image src="https://picsum.photos/seed/dutta-portrait/600/700" className="rounded-xl w-full h-auto object-cover animate-image-reveal" alt="Portrait of Dr. Debashis Dutta" width={600} height={700} loading="lazy" data-ai-hint="doctor portrait"/>
                            </div>
                            <div className="lg:col-span-3">
                                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">A Leader in Advanced Cataract Surgery</h3>
                                <div className="text-md md:text-lg text-muted-foreground space-y-4 animate-text">
                                    <p>Dr. Debashis Dutta is a board-certified ophthalmologist, celebrated for his pioneering work in advanced cataract and refractive lens surgery. With over 20 years of experience, he is dedicated to restoring and enhancing vision using the most sophisticated techniques available.</p>
                                    <p>His patient-centric approach ensures that every individual receives a personalized treatment plan designed to achieve the best possible visual outcomes, reducing or eliminating the need for glasses.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <div className="animate-item">
                <section id="awards" className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16">Awards &amp; Global Recognition</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {awards.map((award, index) => (
                                <div key={index} className="bg-card multicolor-shadow p-6 rounded-xl border flex flex-col text-center items-center animate-item" style={{'--delay': `${index * 0.1}s`} as React.CSSProperties}>
                                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                                        <Award className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-primary mb-1">{award.title}</h3>
                                    <p className="text-sm text-muted-foreground">{award.issuer} - {award.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="animate-item">
                <section id="philosophy" className="py-20 md:py-32 container mx-auto px-6 bg-card rounded-3xl multicolor-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="philosophy-text-content">
                            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-primary">My Philosophy</h2>
                            <div className="text-md md:text-lg text-muted-foreground space-y-4 animate-text">
                               <p>My practice is built on a foundation of precision, trust, and technological excellence. I believe clear vision is paramount to quality of life, and I am committed to employing meticulous surgical skill to achieve that for every patient.</p>
                               <p>We provide a clear, confident, and comfortable journey to visual freedom, ensuring you are informed and at ease every step of the way.</p>
                            </div>
                        </div>
                        <div className="relative h-80 md:h-96 philosophy-image-container">
                            <div className="absolute inset-0 rounded-xl overflow-hidden multicolor-shadow philosophy-image-1 image-reveal-container">
                                <Image src="https://picsum.photos/seed/clear-vision/600/800" className="w-full h-full object-cover animate-image-reveal" alt="A sharp, clear depiction of an eye" width={600} height={800} loading="lazy" data-ai-hint="clear vision"/>
                            </div>
                            <div className="absolute w-2/3 h-2/3 -bottom-10 -right-4 md:-right-10 rounded-xl overflow-hidden multicolor-shadow philosophy-image-2 border-4 border-card image-reveal-container">
                                <Image src="https://picsum.photos/seed/iol-lens/400/400" className="w-full h-full object-cover animate-image-reveal" alt="An intraocular lens" width={400} height={400} loading="lazy" data-ai-hint="medical equipment"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

             <section id="procedures" className="py-20 md:py-32">
                <div className="pin-container">
                    <div className="horizontal-scroll-section flex-col lg:flex-row">
                        <div className="procedure-panel flex-col text-center px-4">
                            <h2 className="text-4xl md:text-7xl font-semibold text-foreground">Cataract Procedures</h2>
                            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl font-light">Specialized techniques for safe, rapid, and predictable visual recovery.</p>
                        </div>
                        <div className="procedure-panel">
                             <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4">
                                <div className="image-reveal-container rounded-xl multicolor-shadow">
                                    <Image src="https://picsum.photos/seed/phaco/800/600" className="rounded-xl w-full h-auto object-cover animate-image-reveal" alt="Advanced Phacoemulsification surgery" loading="lazy" width={800} height={600} data-ai-hint="surgery operation"/>
                                </div>
                                <div><h3 className="text-2xl md:text-4xl font-semibold text-primary">Advanced Phacoemulsification</h3><p className="mt-4 text-md md:text-lg text-muted-foreground font-light">Utilizing ultrasonic energy to emulsify the cataract with microscopic incisions for rapid visual recovery.</p></div>
                             </div>
                        </div>
                        <div className="procedure-panel">
                            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4">
                                <div className="image-reveal-container rounded-xl multicolor-shadow">
                                    <Image src="https://picsum.photos/seed/premium-iols/800/600" className="rounded-xl w-full h-auto object-cover animate-image-reveal" alt="A selection of premium intraocular lenses" loading="lazy" width={800} height={600} data-ai-hint="medical equipment"/>
                                </div>
                                <div><h3 className="text-2xl md:text-4xl font-semibold text-primary">Premium IOL Implantation</h3><p className="mt-4 text-md md:text-lg text-muted-foreground font-light">Offering multifocal, toric, and EDOF intraocular lenses to reduce dependence on glasses.</p></div>
                            </div>
                        </div>
                        <div className="procedure-panel">
                            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4">
                                <div className="image-reveal-container rounded-xl multicolor-shadow">
                                    <Image src="https://picsum.photos/seed/flacs/800/600" className="rounded-xl w-full h-auto object-cover animate-image-reveal" alt="A femtosecond laser system for cataract surgery" loading="lazy" width={800} height={600} data-ai-hint="laser surgery"/>
                                </div>
                                <div><h3 className="text-2xl md:text-4xl font-semibold text-primary">Laser-Assisted Surgery (FLACS)</h3><p className="mt-4 text-md md:text-lg text-muted-foreground font-light">Employing bladeless laser technology for unparalleled precision in creating incisions and softening the cataract.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
             <div className="animate-item">
                 <section id="more-procedures" className="py-20 md:py-32 bg-background">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16">Ophthalmic Specializations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-card multicolor-shadow p-8 rounded-xl border"><h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">Refractive Lens Exchange</h3><p className="text-sm md:text-base text-muted-foreground font-light">Replacing the natural lens to correct refractive errors like presbyopia and high myopia.</p></div>
                            <div className="bg-card multicolor-shadow p-8 rounded-xl border"><h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">YAG Capsulotomy</h3><p className="text-sm md:text-base text-muted-foreground font-light">A simple laser procedure to clear cloudiness that can sometimes develop after cataract surgery.</p></div>
                            <div className="bg-card multicolor-shadow p-8 rounded-xl border"><h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">Complex Cataract Cases</h3><p className="text-sm md:text-base text-muted-foreground font-light">Expert management of cataracts in patients with co-existing conditions like glaucoma or trauma.</p></div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="animate-item">
                <section id="technology" className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16">The Ophthalmic Suite</h2>
                        <p className="text-center max-w-3xl mx-auto text-md md:text-lg text-muted-foreground mb-12 font-light">Our practice is equipped with the most advanced diagnostic and surgical technology available, ensuring every procedure is performed with the highest degree of accuracy and safety.</p>
                        <div className="bg-card rounded-2xl p-4 md:p-8 multicolor-shadow">
                            <div className="aspect-video bg-black rounded-lg flex items-center justify-center image-reveal-container">
                                 <Image src="https://picsum.photos/seed/sim/1280/720" className="w-full h-full object-cover rounded-lg animate-image-reveal" alt="A 3D simulation of cataract surgery on a screen" loading="lazy" width={1280} height={720} data-ai-hint="simulation surgery"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="animate-item">
                <section id="journey" className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 md:mb-24">The Patient Journey</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            {journeySteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
                                <span className="text-3xl font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground font-light">{step.description}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="animate-item">
                <section id="testimonials" className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16">Patient Experiences</h2>
                         <Carousel
                            opts={{
                              align: "start",
                              loop: true,
                            }}
                            className="w-full"
                          >
                            <CarouselContent>
                              {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                  <div className="p-1">
                                    <Card className="h-full multicolor-shadow">
                                      <CardContent className="flex h-full flex-col justify-between p-8">
                                        <p className="text-muted-foreground italic font-light mb-6">"{testimonial.text}"</p>
                                        <p className="text-right font-medium text-primary">- {testimonial.name}</p>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="ml-12"/>
                            <CarouselNext className="mr-12"/>
                          </Carousel>
                    </div>
                </section>
            </div>
            
            <div className="animate-item">
                <section id="faq" className="py-20 md:py-32 bg-background">
                     <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="faq-item bg-card multicolor-shadow border p-6 rounded-lg"><summary className="font-medium text-lg md:text-xl cursor-pointer flex justify-between items-center">Is cataract surgery painful? <ChevronDown className="transition-transform duration-300 faq-chevron" /></summary><p className="mt-4 text-muted-foreground text-sm md:text-base font-light">No, cataract surgery is not painful. We use anesthetic eye drops to completely numb your eye before and during the procedure, so you will feel no pain, only light pressure at most.</p></details>
                            <details className="faq-item bg-card multicolor-shadow border p-6 rounded-lg"><summary className="font-medium text-lg md:text-xl cursor-pointer flex justify-between items-center">How long is the recovery? <ChevronDown className="transition-transform duration-300 faq-chevron" /></summary><p className="mt-4 text-muted-foreground text-sm md:text-base font-light">Recovery is very quick. Most patients notice clearer vision within 24 hours. You can typically resume normal, non-strenuous activities the next day. A full recovery usually takes about a month.</p></details>
                            <details className="faq-item bg-card multicolor-shadow border p-6 rounded-lg"><summary className="font-medium text-lg md:text-xl cursor-pointer flex justify-between items-center">Will I need glasses after surgery? <ChevronDown className="transition-transform duration-300 faq-chevron" /></summary><p className="mt-4 text-muted-foreground text-sm md:text-base font-light">This depends on the type of intraocular lens (IOL) you choose. With standard monofocal lenses, you will likely need reading glasses. With premium multifocal or EDOF lenses, your dependence on glasses can be significantly reduced or even eliminated.</p></details>
                        </div>
                    </div>
                </section>
            </div>

             <div className="animate-item">
                 <section id="contact" className="py-32 flex justify-center items-center flex-col text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold mb-4">Begin Your Journey to Clear Vision</h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light">Ready to discuss your options? Reach out to schedule a private and comprehensive consultation.</p>
                        <Link href="mailto:consult@drdebashisdutta.com" className="text-2xl md:text-3xl font-semibold text-primary hover:opacity-80 transition-opacity contact-email">consult@drdebashisdutta.com</Link>
                    </div>
                </section>
            </div>
          </div>
        </main>
    
        <div id="chatbot-container" className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
            <button id="chatbot-bubble" className="w-14 h-14 sm:w-16 sm:h-16 bg-card multicolor-shadow rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                <MessageCircle className="text-primary w-7 h-7 sm:w-8 sm:h-8" />
            </button>
            <div id="chatbot-window" className="w-80 h-[28rem] bg-card/80 backdrop-blur-md border rounded-2xl multicolor-shadow flex flex-col absolute bottom-20 right-0 sm:bottom-24 transform scale-95 opacity-0 transition-all duration-300 pointer-events-none origin-bottom-right">
                <div className="p-4 border-b"><h3 className="font-semibold text-lg">Virtual Assistant</h3><p className="text-sm text-muted-foreground font-light">How can I help you today?</p></div>
                 <ScrollArea className="flex-1">
                    <div id="chat-messages" className="p-4 space-y-4">
                        {/* Messages will be injected here */}
                    </div>
                </ScrollArea>
                <div id="chat-options" className="p-4 border-t space-y-2"></div>
            </div>
        </div>

        <style jsx global>{`
          body {
            visibility: hidden; /* Hide body until GSAP is ready */
          }
          .pin-container {
              width: 100%;
              overflow: hidden;
          }
          @media (min-width: 1024px) {
            .pin-container {
                height: 100vh;
            }
          }
          .horizontal-scroll-section {
             display: flex;
             /* Stack panels on mobile */
             width: 100%;
             height: auto;
             flex-direction: column;
             gap: 4rem;
             padding-block: 5rem;
          }
          @media (min-width: 1024px) {
            .horizontal-scroll-section {
                 flex-direction: row;
                 width: 400%;
                 height: 100vh;
                 gap: 0;
                 padding-block: 0;
            }
          }
          .procedure-panel {
              width: 100vw;
              min-height: auto; /* Ensure some height on mobile */
              display: flex;
              justify-content: center;
              align-items: center;
              flex-shrink: 0;
          }
           @media (min-width: 1024px) {
                .procedure-panel {
                    height: 100vh;
                    padding: 0;
                    min-height: 100vh;
                }
           }
          
          .faq-item summary::-webkit-details-marker { display: none; }
          .faq-item summary { list-style: none; }
          .faq-item[data-open] .faq-chevron { transform: rotate(180deg); }

          .split-char {
            display: inline-block;
          }

          .animate-text {
            overflow: hidden;
          }

          .animate-item {
            animation: animate-item-in 1s ease-out forwards;
            animation-timeline: view();
            animation-range: entry 10% cover 20%;
            opacity: 0;
          }
          
          @keyframes animate-item-in {
              from { opacity: 0; transform: translateY(50px); }
              to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
    </>
  );
}

export default HomePage;
