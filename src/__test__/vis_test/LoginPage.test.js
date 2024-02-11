import '@testing-library/jest-dom'
import {render, screen, waitFor, getByPlaceholderText } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom'
import LoginPage from "../../components/vis_test/LoginPage"
import App from "../../App"

const input = {
  name: "John",
  password: 'xxxxxxxx',
};

describe("Login Page Test", () => {
    it('render LoginPange component', async () => {
        const {container} = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        expect(screen.getByRole('button')).toBeInTheDocument();

    });

    it('Input non-empty student_id and non-empty student_name', async () => {
        const {container} = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        userEvent.type(container.querySelector('#student_id'), input.name);
        userEvent.type(container.querySelector('#student_name'), input.password);

        await waitFor(() => expect(screen.getByRole('button')).toBeEnabled());
    });

});
