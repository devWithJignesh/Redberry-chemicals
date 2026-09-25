import { useEffect } from 'react';
import Hero from './components/Hero/Hero';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import ProductsPreview from './components/ProductsPreview/ProductsPreview';
import CoreValues from './components/CoreValues/CoreValues';
import Stats from './components/Stats/Stats';
import Testimonials from './components/Testimonials/Testimonials';
import CTA from './components/CTA/CTA';

import {
  HERO_DATA,
  WHY_CHOOSE_US_DATA,
  PRODUCTS_PREVIEW_DATA,
  CORE_VALUES_DATA,
  STATS_DATA,
  TESTIMONIALS_DATA,
  CTA_DATA,
} from './data';
import { scrollToTop } from '../../../utils/helpers';

export default function Home() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="home-page">
      <Hero data={HERO_DATA} />
      <WhyChooseUs data={WHY_CHOOSE_US_DATA} />
      <ProductsPreview data={PRODUCTS_PREVIEW_DATA} />
      <CoreValues data={CORE_VALUES_DATA} />
      <Stats data={STATS_DATA} />
      <Testimonials data={TESTIMONIALS_DATA} />
      <CTA data={CTA_DATA} />
    </div>
  );
}
