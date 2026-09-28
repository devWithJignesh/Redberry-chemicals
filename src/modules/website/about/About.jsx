import { useEffect } from 'react';
import PageHeroBanner from '../../../components/PageHeroBanner/PageHeroBanner';
import CompanyStory from './components/CompanyStory/CompanyStory';
import VideoShowcase from '../../../components/common/VideoShowcase/VideoShowcase';
import MediaGallery from '../../../components/common/MediaGallery/MediaGallery';
import OwnersTeam from './components/OwnersTeam/OwnersTeam';
import MissionVision from './components/MissionVision/MissionVision';
import CoreValues from '../home/components/CoreValues/CoreValues';
import { OWNERS } from '../../../data/company';
import { PAGE_VIDEOS } from '../../../data/videos';
import {
  ABOUT_CONTENT,
  CORE_VALUES,
  MISSION_VISION_DATA,
  LEADERSHIP_SECTION_DATA,
} from './data';
import { scrollToTop } from '../../../utils/helpers';

export default function About() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const coreValuesSectionData = {
    badge: "Our Guiding Principles",
    title: "Core Values That Drive Redberry",
    subtitle: "Every formulation, partnership, and field trial is rooted in our foundational pillars.",
    values: CORE_VALUES,
  };

  return (
    <div className="about-page">
      {/* Page Video Hero Banner */}
      <PageHeroBanner
        badge="ABOUT REDBERRY AGRI SCIENCES"
        title="Pioneering Scientific Agrochemical Care Across India"
        subtitle="From research-backed bio-formulations to trusted dealer partnerships, we empower Indian farmers with high-efficacy crop protection."
        videoSrc={PAGE_VIDEOS.about.heroVideo}
        imageSrc={PAGE_VIDEOS.about.heroPoster}
        breadcrumbs={[{ label: 'About Us' }]}
        primaryCta={{ label: 'Explore Products', href: '/products' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      {/* Company Story */}
      <CompanyStory data={ABOUT_CONTENT} />

      {/* Field Operations & Research Video Showcase */}
      <VideoShowcase
        badge="Research & Field Operations"
        title="Formulation Precision & Field Performance"
        subtitle="Experience our scientific approach to sustainable crop care and bio-efficacy testing across diverse cropping zones."
        videoSrc={PAGE_VIDEOS.about.showcaseVideo}
        posterImage={PAGE_VIDEOS.about.showcasePoster}
        ctaText="View Crop Care Products"
        ctaLink="/products"
        contactLink="/contact"
      />

      {/* Media & Operations Gallery */}
      <MediaGallery
        badge="Redberry Media & Evidence"
        title="Visualizing Our Agricultural Commitment"
        subtitle="A closer look into our verified formulations, field demonstrations, and farmer support networks."
        items={PAGE_VIDEOS.galleryVideos}
      />

      {/* Owners & Leadership Team */}
      <OwnersTeam
        headerData={LEADERSHIP_SECTION_DATA}
        owners={OWNERS}
      />

      {/* Core Values */}
      <CoreValues data={coreValuesSectionData} />

      {/* Mission & Vision */}
      <MissionVision data={MISSION_VISION_DATA} />
    </div>
  );
}
