import { useEffect } from 'react';
import CompanyStory from './components/CompanyStory/CompanyStory';
import OwnersTeam from './components/OwnersTeam/OwnersTeam';
import MissionVision from './components/MissionVision/MissionVision';
import CoreValues from '../home/components/CoreValues/CoreValues';
import { OWNERS } from '../../../data/company';
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
      <CompanyStory data={ABOUT_CONTENT} />
      <OwnersTeam
        headerData={LEADERSHIP_SECTION_DATA}
        owners={OWNERS}
      />
      <CoreValues data={coreValuesSectionData} />
      <MissionVision data={MISSION_VISION_DATA} />
    </div>
  );
}
