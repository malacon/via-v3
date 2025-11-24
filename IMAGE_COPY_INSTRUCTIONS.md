# Image Copy Instructions

This document lists all images that need to be manually copied from the source
folders to `/public/img/` with proper naming and optimization.

## Image Processing Requirements

All images should be:

- Converted to JPG format (if HEIC)
- Resized to appropriate dimensions:
  - Hero images: max 1920x1080
  - Gallery images: max 1200x1600
  - Profile images: max 800x1000
- Optimized for web (quality 80-85)
- Named according to the destination paths below

## Homepage Hero Carousel (3 images only)

1. **Source**: `_EventsDances/IMG_3998.jpeg`
   - **Destination**: `/public/img/hero-dancing.jpg`
   - **Type**: Hero (1920x1080 max)

2. **Source**:
   `_1_CURRENTLY IN WEBSITE WIREFRAME/HomePage/HOMEPAGE TOP BAR/VIA-30.HayesAndFellowsSmilingSeminar.JPG`
   - **Destination**: `/public/img/hero-teaching.jpg`
   - **Type**: Hero (1920x1080 max)
   - **Note**: Ensure whiteboard is centered

3. **Source**: `_GroupPhotos/IMG_8720.JPG` (needs to be flipped horizontally)
   - **Destination**: `/public/img/hero-sitting-outside.jpg`
   - **Type**: Hero (1920x1080 max)
   - **Note**: Flip horizontally before saving

## Homepage Mountain Section

4. **Source**: `_TRIPS/IMG_8678.HEIC` (convert to JPG)
   - **Destination**: `/public/img/mountain-isaac-anthony.jpg`
   - **Type**: Hero (1920x1080 max)
   - **Note**: Isaac hoisting Anthony on mountain

## Homepage Profile Gallery

5. **Source**: `_MardiGras/LundiGrasBeggingCroppedLiliana.jpg`
   - **Destination**: `/public/img/profile-liliana-broom.jpg`
   - **Type**: Profile (800x1000 max)

6. **Source**: `_TRIPS/FellowsOnHorses.jpg`
   - **Destination**: `/public/img/profile-fellows-horses.jpg`
   - **Type**: Gallery (1200x1600 max)

7. **Source**: Need to locate "Girls Dropping Flowers on St Joseph" in source
   folders
   - **Destination**: `/public/img/profile-girls-flowers.jpg`
   - **Type**: Profile (800x1000 max)

8. **Source**: Need to locate "Rachel praying at Clear Creek" in `_PrayerPics`
   or `_TRIPS`
   - **Destination**: `/public/img/profile-rachel-praying.jpg`
   - **Type**: Profile (800x1000 max)

## Life in Via Page

9. **Source**: `_MardiGras/LundiGrasRunningStreet.jpg`
   - **Destination**: `/public/img/service-lundi-gras.jpg`
   - **Type**: Gallery (1200x1600 max)
   - **Note**: For Service & Community section

10. **Source**: `_GroupPhotos/StagedCheckInMusicRoom.JPG`
    - **Destination**: `/public/img/internal-support-music-room.jpg`
    - **Type**: Gallery (1200x1600 max)
    - **Note**: For Internal Support section

11. **Source**: `_STUDY/IMG_9653.jpeg`
    - **Destination**: `/public/img/external-support-alt.jpg` (already exists,
      verify it's correct)
    - **Type**: Gallery (1200x1600 max)

12. **Source**: `_TRIPS/FellowsOnHorses.jpg`
    - **Destination**: `/public/img/retreats-pilgrimages.jpg` (already exists,
      verify it's correct)
    - **Type**: Gallery (1200x1600 max)

## Why Via Page

13. **Source**: `_HEADshots/VIA-12.HayesAndFellowsLaughing.jpg`
    - **Destination**: `/public/img/testimonial-ellen-rachel-mountain.jpg`
    - **Type**: Gallery (1200x1600 max)
    - **Note**: Ellen and Rachel in front of mountain, zoom out to show both

## FAQ Page

14. **Source**: `_B_ROLL/VIA-15=BooksAndGlasses.jpg`
    - **Destination**: `/public/img/faq-books-glasses.jpg`
    - **Type**: Gallery (1200x1600 max)
    - **Note**: Bottom of FAQ page

## Notes

- All HEIC files need to be converted to JPG (use `sips` on macOS or image
  editing software)
- Images should be optimized for web (compressed, proper dimensions)
- Ensure proper centering and cropping as specified in design notes
- The image processing script (`scripts/process-images.ts`) is available but
  requires Node.js to run
