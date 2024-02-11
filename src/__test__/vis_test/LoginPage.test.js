import '@testing-library/jest-dom'
import {render, screen, waitFor, fireEvent } from "@testing-library/react"
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
        render(
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

    it('Input non-empty student_id and empty student_name', async () => {
        const {container} = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        userEvent.type(container.querySelector('#student_id'), input.name);
        userEvent.type(container.querySelector('#student_name'), "");

        const button = screen.getByRole('button')
        fireEvent.click(button)
        await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
    });

    it('Input empty student_id and non-empty student_name', async () => {
        const {container} = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        userEvent.type(container.querySelector('#student_id'), "");
        userEvent.type(container.querySelector('#student_name'), input.password);

        const button = screen.getByRole('button')
        fireEvent.click(button)
        await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
    });

    it('Input empty student_id and empty student_name', async () => {
        const {container} = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        userEvent.type(container.querySelector('#student_id'), "");
        userEvent.type(container.querySelector('#student_name'), "");

        const button = screen.getByRole('button')
        fireEvent.click(button)
        await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
    });
});
