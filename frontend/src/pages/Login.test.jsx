import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Login from './Login';

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it('permite escribir credenciales y guarda el token si el login es correcto', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ token: 'token-de-prueba' }),
    });

    render(<Login />);

    await user.type(screen.getByPlaceholderText('username'), 'admin');
    await user.type(screen.getByPlaceholderText('password'), '1234');
    await user.click(screen.getByRole('button', { name: 'Acceder' }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('token-de-prueba');
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  it('muestra una alerta si el backend no devuelve token', async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({}),
    });

    render(<Login />);

    await user.type(screen.getByPlaceholderText('username'), 'admin');
    await user.type(screen.getByPlaceholderText('password'), 'incorrecta');
    await user.click(screen.getByRole('button', { name: 'Acceder' }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Login incorrecto');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
