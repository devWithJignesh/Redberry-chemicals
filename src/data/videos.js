/* ============================================
   CENTRAL VIDEO LIBRARY & LINK CONFIGURATION
   ============================================
   You can easily change or add new video links here.
   Supported formats:
   - Local MP4 files (e.g., "/images/hero/my-video.mp4")
   - Direct MP4/WebM URLs (e.g., "https://cdn.example.com/video.mp4")
   - YouTube links (e.g., "https://www.youtube.com/watch?v=VIDEO_ID" or "https://youtu.be/VIDEO_ID")
   - Vimeo links (e.g., "https://vimeo.com/12345678")
   ============================================ */

export const PAGE_VIDEOS = {
  // Home Hero Slider Videos
  homeHero: [
    {
      id: "home-vid-1",
      title: "Tractor Wheat Field Sunset",
      videoUrl: "/images/hero/mixkit-tractor-in-a-wheat-field-at-sunset-done-in-cgi-34035-hd-ready.mp4",
      posterUrl: "/images/hero/slide-1.jpg",
    },
    {
      id: "home-vid-2",
      title: "Grass Growing Time-Lapse",
      videoUrl: "/images/hero/mixkit-grass-growing-time-lapse-15959-hd-ready.mp4",
      posterUrl: "/images/hero/slide-2.jpg",
    },
  ],

  // About Page Videos
  about: {
    heroVideo: "/images/hero/mixkit-grass-growing-time-lapse-15959-hd-ready.mp4",
    heroPoster: "/images/hero/slide-2.jpg",
    showcaseVideo: "/images/hero/mixkit-tractor-in-a-wheat-field-at-sunset-done-in-cgi-34035-hd-ready.mp4",
    showcasePoster: "/images/hero/slide-1.jpg",
  },

  // Products Page Videos
  products: {
    heroVideo: "/images/hero/mixkit-tractor-in-a-wheat-field-at-sunset-done-in-cgi-34035-hd-ready.mp4",
    heroPoster: "/images/banners/tractor_spray_hero.jpg",
    showcaseVideo: "/images/hero/mixkit-grass-growing-time-lapse-15959-hd-ready.mp4",
    showcasePoster: "/images/hero/slide-2.jpg",
  },

  // Contact Page Videos
  contact: {
    heroVideo: "/images/hero/mixkit-tractor-in-a-wheat-field-at-sunset-done-in-cgi-34035-hd-ready.mp4",
    heroPoster: "/images/hero/slide-1.jpg",
    showcaseVideo: "/images/hero/mixkit-grass-growing-time-lapse-15959-hd-ready.mp4",
    showcasePoster: "/images/hero/slide-2.jpg",
  },

  // Media Gallery Video Collection
  galleryVideos: [
    {
      id: 1,
      type: "video",
      src: "/images/hero/mixkit-grass-growing-time-lapse-15959-hd-ready.mp4",
      poster: "/images/hero/slide-2.jpg",
      title: "Bio-Efficacy & Crop Recovery Time-Lapse",
      description: "Witness rapid foliage health and leaf recovery after Redberry formulation application.",
      tag: "Time-Lapse Video",
      link: "/products",
      linkText: "View Products",
    },
    {
      id: 2,
      type: "image",
      src: "/images/banners/tractor_spray_hero.jpg",
      title: "Precision Field Spraying",
      description: "Extensive field trial evaluations ensuring rain-fastness and residual pest knockdown.",
      tag: "Field Operations",
      link: "/products/insecticides",
      linkText: "Explore Insecticides",
    },
    {
      id: 3,
      type: "video",
      src: "/images/hero/mixkit-tractor-in-a-wheat-field-at-sunset-done-in-cgi-34035-hd-ready.mp4",
      poster: "/images/hero/slide-1.jpg",
      title: "Mechanized Crop Care",
      description: "Formulations engineered for broad-spectrum compatibility across Indian soil zones.",
      tag: "Application Video",
      link: "/contact",
      linkText: "Contact Sales",
    },
    {
      id: 4,
      type: "image",
      src: "/images/hero/slide-4.jpg",
      title: "Quality Control & Lab Testing",
      description: "Every production batch undergoes strict laboratory verification for active purity.",
      tag: "Quality Assurance",
      link: "/about",
      linkText: "Learn About Us",
    },
  ],
};
