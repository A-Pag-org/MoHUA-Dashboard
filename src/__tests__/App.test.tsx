import React from 'react';
import { render, screen } from '../test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../App';

function renderApp(initialPath = '/') {
  const router = createMemoryRouter(
    [
      { path: '*', element: <App /> },
    ],
    { initialEntries: [initialPath] }
  );
  return render(<RouterProvider router={router} />);
}

describe('App routing', () => {
  it('renders LandingPage on /', () => {
    renderApp('/');
    expect(screen.getByText(/Program Overview Statistics/i)).toBeInTheDocument();
  });

  it('renders DSP dashboard on /dsp', () => {
    renderApp('/dsp');
    expect(screen.getByText(/Dispersed Source Programme/i)).toBeInTheDocument();
  });
});
