# **App Name**: AbiliMove

## Core Features:

- Accessible Vehicle Locator: Locate and book verified accessible vehicles, mirroring Ace Mobility partners. This feature enables users to find transportation options tailored to their specific accessibility needs.
- Community Rating System (Matatu Mate): Allow users/caregivers to rate public transport stops and staff courtesy on a 1-5 scale, tied to geolocation. Ratings data is stored in a PostgreSQL database.
- Low-Tech USSD/SMS Fallback: Enable core functions via USSD and SMS for submitting ratings and requesting basic service contact information, ensuring accessibility for users with low connectivity or non-smartphones.
- Route Recommendations with Accessibility Analysis Tool: Leverage aggregated rating data from 'Matatu Mate' and real-time vehicle availability to suggest accessible routes. Use AI as a tool for analyzing optimal paths. Incorporates user-specific needs (e.g. wheelchair accessible).

## Style Guidelines:

- Primary color: Deep blue (#3F51B5), inspired by trustworthiness and stability. It provides a solid base for an app focused on reliable transportation.
- Background color: Light gray (#E8EAF6), offering a subtle, neutral backdrop to ensure high readability.
- Accent color: Vibrant orange (#FF9800) is used to draw attention to calls to action and important notifications. The goal is to provide clear visual cues that aid usability.
- Body and headline font: 'PT Sans', a humanist sans-serif for a modern yet accessible look. Suitable for both headlines and body text, ensuring legibility.
- Use clear, recognizable icons to represent different types of accessibility features, ratings, and transport options. Simple line icons will ensure clarity on different screen sizes and resolutions.
- Prioritize a clean, intuitive layout that simplifies navigation and content discovery. Important elements such as vehicle location, ratings input, and contact options should be immediately visible.
- Employ subtle animations and transitions to guide users through different interactions and enhance engagement without distracting from usability.