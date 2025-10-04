import React from 'react';
import { render, screen } from '../../../test-utils';
import Header from '../Header';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

function renderWithNav(initialPath = '/') {
  const routes = [
    { path: '/', element: <Header /> },
    { path: '/dsp', element: <div>DSP Page</div> },
    { path: '/cd', element: <div>CD Page</div> },
    { path: '/mrs', element: <div>MRS Page</div> },
  ];
  const router = createMemoryRouter(routes, { initialEntries: [initialPath] });
  return render(<RouterProvider router={router} />);
}

describe('Header', () => {
  it('renders title', () => {
    renderWithNav();
    expect(screen.getByText('MoHUA')).toBeInTheDocument();
  });

  it('navigates to DSP when DSP button clicked', async () => {
    renderWithNav();
    await userEvent.click(screen.getByRole('button', { name: /dsp/i }));
    expect(screen.getByText('DSP Page')).toBeInTheDocument();
  });
});
