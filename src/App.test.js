import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const NAV_LINKS = {
  HOME: /home/i,
  ABOUT: /about/i,
  DASHBOARD: /dashboard/i,
  WORK_ORDERS: /work orders/i,
};
const history = createMemoryHistory();

test('renders all header navigation links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: NAV_LINKS.HOME })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: NAV_LINKS.WORK_ORDERS })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: NAV_LINKS.DASHBOARD })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: NAV_LINKS.ABOUT })).toBeInTheDocument();
});

test('navigate to all pages in the app', () => {
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  // Check that the Home page at site root renders
  expect(screen.getByText(/welcome home/i)).toBeInTheDocument();

  // Check that the About page renders
  userEvent.click(screen.getByText(NAV_LINKS.ABOUT));
  expect(screen.getByText(/learn about/i)).toBeInTheDocument();

  // Check that the Dashboard page renders
  userEvent.click(screen.getByText(NAV_LINKS.DASHBOARD));
  expect(screen.getByText(/keep up/i)).toBeInTheDocument();

  // Check that the Work Orders page renders with table headers
  userEvent.click(screen.getByText(NAV_LINKS.WORK_ORDERS));
  expect(screen.getByRole('heading', { name: /work orders/i })).toBeInTheDocument();
});

test('renders each Work Order Details modal in the table without crashing', () => {
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  
  const workOrderRows = screen.getAllByTestId('work-order-row')
  expect(workOrderRows.length).toBeGreaterThan(0)
  
  for (const row of workOrderRows) {
    userEvent.click(row);
    expect(screen.getByRole('heading', { name: /work order id:/i }))
    expect(screen.getByText(/description:/i))
    userEvent.click(screen.getByRole('button', { name: /x/i }))
  }
});