import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../client/components/Main';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from '../client/components/userLogin/Login';
import Signup from '../client/components/userLogin/signUp';
import Test from '../client/components/Test';
import BasicClusterInfo from '../client/components/BasicClusterInfo';

describe('correctly renders App', () => {
  xdescribe('correctly render Main', () => {
    beforeEach(() => render(<Main />));

    test('render correct number of input fields in Main', async () => {
      const inputs = await screen.getAllByRole('textbox');
      expect(inputs.length).toEqual(3);
    });

    test('correctly renders 1 button in Main', async () => {
      const button = await screen.getAllByRole('button');
      expect(button.length).toEqual(1);
    });

    test('correctly renders logo in Main', async () => {
      const img = await screen.getAllByRole('img');
      expect(img.length).toEqual(1);
    });
  });

  xdescribe('correctly render Login', () => {
    beforeEach(() =>
      render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      )
    );

    test('correctly renders input fields in Login', async () => {
      // check username exist
      expect(screen.getByPlaceholderText('Enter username')).toHaveAttribute(
        'type',
        'username'
      );
      // check password exist
      expect(screen.getByPlaceholderText('Enter password')).toHaveAttribute(
        'type',
        'password'
      );
      //password field not accessible over selector, input with type password has no role
      const inputs = await screen.getAllByRole('textbox');
      expect(inputs.length).toEqual(1);
    });

    test('correctly renders 1 button in Login', async () => {
      const button = await screen.getAllByRole('button');
      expect(button.length).toEqual(1);
    });

    test('correctly renders link in Login', async () => {
      const img = await screen.getAllByRole('link');
      expect(img.length).toEqual(1);
    });
  });

  xdescribe('correctly render Signup', () => {
    beforeEach(() => render(<Signup />));

    test('correctly renders input fields in Signup', async () => {
      // check username exists
      expect(screen.getByPlaceholderText('Enter username')).toHaveAttribute(
        'type',
        'username'
      );
      // check password exists
      expect(screen.getByPlaceholderText('Enter password')).toHaveAttribute(
        'type',
        'password'
      );
      //password field not accessible over selector, input with type password has no role
      const inputs = await screen.getAllByRole('textbox');
      expect(inputs.length).toEqual(4);
    });

    test('correctly renders 1 button in Signup', async () => {
      const button = await screen.getAllByRole('button');
      expect(button.length).toEqual(1);
    });
  });

  xdescribe('correctly render Test', () => {
    beforeEach(() => render(<Test />));

    test('render correct number of input fields in Test', async () => {
      const inputs = await screen.getAllByRole('textbox');
      expect(inputs.length).toEqual(2);
    });

    test('correctly renders 2 buttons in Test', async () => {
      const button = await screen.getAllByRole('button');
      expect(button.length).toEqual(2);
    });
  });
  describe('correctly render Test', () => {
    const topic = {
      name: 'topicName',
      partitions: [{}, {}, {}],
    };
    test('renders "Not Connected" when topic is empty', async () => {
      render(<BasicClusterInfo topics={[]} />);
      // const message = await screen.getAllByRole('button');
      expect(screen.getByText('Not Connected')).toBeInTheDocument();
      // expect(message.length).toEqual(0);
      // expect(message.innerText).toEqual("Not Connected");
    });
  });
});

/*
topic = {
  name: "topicName"
  partitions: [{}, {}, {}]
}
*/
