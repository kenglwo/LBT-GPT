import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {MemoryRouter, Route, useNavigate} from 'react-router-dom'
import * as ReactRouterDom from 'react-router-dom'
// import { jest } from '@jest/globals'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import fetchMock from 'jest-fetch-mock'
import LoginPage from "../../components/vis_test/LoginPage"
import App from "../../App"

const input = {
  name: "John",
  password: 'xxxxxxxx',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe("Login Page Test", () => {
    let navigateMock = jest.fn();

    beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ "status": "success"}),
          })
        );

        ReactRouterDom.useNavigate.mockReturnValue(navigateMock);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('render LoginPange component', async () => {
    // it.skip('render LoginPange component', async () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        expect(screen.getByRole('button')).toBeInTheDocument();

    });

    it('Input non-empty student_id and non-empty student_name', async () => {
    // it.skip('Input non-empty student_id and non-empty student_name', async () => {
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
    // it.skip('Input non-empty student_id and empty student_name', async () => {
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
    // it.skip('Input empty student_id and non-empty student_name', async () => {
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
    // it.skip('Input empty student_id and empty student_name', async () => {
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

    it('should trigger a successful POST request and page transition', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => (JSON.stringify({ status: 'success' })),
        });

        const {container} = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );


        userEvent.type(container.querySelector('#student_id'), input.name);
        userEvent.type(container.querySelector('#student_name'), input.password);

        const button = screen.getByRole('button')

        fireEvent.click(button)

        const url = `${process.env.REACT_APP_API_URL}/save_student_info`
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(url, expect.anything())
            expect(navigateMock).toHaveBeenCalledWith("/test", {"state": {"studentId": "xxxxxxxx", "studentName": "John"}})
        });
    });
});
