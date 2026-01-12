import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current || !triggerRef.current) return;

            const section = sectionRef.current;

            gsap.to(section, {
                x: () => -(section.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => "+=" + (section.scrollWidth - window.innerWidth),
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="overflow-hidden">
            <div ref={triggerRef} className="relative">
                <div
                    ref={sectionRef}
                    className="h-screen h-[100dvh] flex flex-row relative will-change-transform"
                    style={{ width: 'max-content' }}
                >
                    {children}
                </div>
            </div>
        </section>
    );
};
