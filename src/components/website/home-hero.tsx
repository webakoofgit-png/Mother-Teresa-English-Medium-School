import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, BookOpen, Heart, Sparkles } from 'lucide-react';
import { images, school } from '@/data/site';
import { useDemo } from '@/data/demo';

export function HomeHero() {
  const data = useDemo();
  return <section className="home-hero">
    <div className="hero-orbit orbit-one" aria-hidden /><div className="hero-orbit orbit-two" aria-hidden />
    <div className="container-site"><div className="hero-editorial"><motion.div className="hero-title-block" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><p className="hero-eyebrow"><span /> A WORLD OF LEARNING. A FUTURE OF POSSIBILITIES.</p><h1>{data.content.hero === 'Where Young Minds Grow Into Bright Futures.' ? <>Where young minds<br />grow into <span>bright futures.</span></> : data.content.hero}</h1></motion.div><motion.div className="hero-aside" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .15 }}><div className="hero-little-sun" aria-hidden><Sparkles size={28} strokeWidth={1.4} /></div><p>From first discoveries to confident next steps. An education that nurtures curiosity, character and a lifelong love of learning.</p><div className="hero-buttons"><Link to="/admissions" className="btn-primary">Begin your child’s journey <ArrowRight size={16} /></Link><Link to="/about" className="hero-text-link">Discover our school <ArrowRight size={15} /></Link></div></motion.div></div>
      <motion.figure className="hero-panorama" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .2 }}><img src={images.heroSchool} alt="Illustrative photograph of children learning and growing together" fetchPriority="high" width={1920} height={1080} /><div className="hero-photo-shade" /><figcaption><span><small>MOTHER TERESA ENGLISH MEDIUM SCHOOL</small><strong>A place to learn.<br />A place to belong.</strong></span><Link to="/gallery" aria-label="Explore our gallery"><ArrowRight size={23} /></Link></figcaption><div className="hero-photo-note">Illustrative image · School photographs to follow</div><div className="hero-note"><span className="hero-note-icon"><Heart size={20} /></span><span>Little moments.<strong>Lifelong possibilities.</strong></span></div></motion.figure>
      <div className="hero-bottomline"><div><BookOpen size={18} /><strong>Nursery to Standard 12</strong><span>Every stage. One thoughtful journey.</span></div><div><span>{school.shortLocation}</span><a href="#welcome-to-school" aria-label="Scroll to learn about the school"><ArrowDown size={18} /></a></div></div>
    </div>
  </section>;
}

export function SchoolBrandBanner() {
  return <section className="school-banner-section"><div className="container-site"><div className="school-banner-caption"><span className="eyebrow">OUR SCHOOL. OUR IDENTITY.</span><span>Managed by Shree Dhanlaxmi Foundation, Karad</span></div><div className="school-banner-frame"><img src="/brand/school-banner.jpeg" alt="Official Mother Teresa English Medium School banner: Malwadi (Masur), Taluka Karad, District Satara; managed by Shree Dhanlaxmi Foundation Karad" width={1600} height={266} loading="lazy" /></div></div></section>;
}
