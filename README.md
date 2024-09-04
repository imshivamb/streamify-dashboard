# Streamify Dashboard

Streamify Dashboard is a Next.js application that provides analytics and insights for a fictional music streaming service.

## Features

- User authentication (login/register)
- Real-time dashboard updates using Server-Sent Events
- Key metrics display
- User growth visualization
- Revenue distribution chart
- Top streamed songs chart
- Recent streams table with sorting and pagination
- Theme switch with light and dark mode
- Loading skeletons

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Zustand for state management
- Recharts for data visualization
- Shadcn UI components
- React Hook Form with Zod for form validation
- Jest and React Testing Library for unit testing

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/streamify-dashboard.git
   ```

2. Install dependencies:
   ```
   cd streamify
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

To run the unit tests:

```
npm test
```

## Performance Considerations

- Lazy loading and code splitting are implemented for dashboard components to improve initial load times.
- Memoization is used in components like KeyMetrics to minimize re-renders.
- Server-Sent Events are used for real-time updates to reduce the need for polling.

## Trade-offs and Decisions

- Mock data is used instead of a real backend to simplify development and demonstration.
- Zustand is chosen over Redux for its simplicity and ease of use in smaller to medium-sized applications.
- Server-Sent Events are used for real-time updates instead of WebSockets for simplicity, though WebSockets might be more appropriate for a production application with bi-directional communication needs.

## Future Improvements

- Implement more comprehensive error handling and loading states.
- Add more unit and integration tests for better code coverage.
- Implement a theme toggle for light/dark mode.
- Create additional pages for detailed analytics, user management, and settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

