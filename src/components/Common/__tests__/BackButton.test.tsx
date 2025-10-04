import React from 'react';
import { render, screen } from '../../../test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BackButton from '../BackButton';

function renderWithRoutes() {
  const router = createMemoryRouter(
    [
      { path: '/', element: <div>Home</div> },
      { path: '/page', element: <BackButton /> },
    ],
    { initialEntries: ['/', '/page'], initialIndex: 1 }
  );
  return render(<RouterProvider router={router} />);
}

describe('BackButton', () => {
  it('navigates back when clicked', async () => {
    renderWithRoutes();

    await userEvent.click(screen.getByRole('button'));

    // After clicking back, it should go to previous entry ('/')
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
