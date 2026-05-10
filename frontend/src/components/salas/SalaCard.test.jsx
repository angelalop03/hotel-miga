import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SalaCard from './SalaCard';

const sala = {
  id: 2,
  nombre_sala: 'Sala Norte',
  personas_max: 12,
  extras: [{ id: 1, nombre: 'Proyector' }],
};

describe('SalaCard', () => {
  it('renderiza los datos principales de una sala', () => {
    render(
      <SalaCard
        sala={sala}
        setSalaSeleccionada={vi.fn()}
        setReservandoSala={vi.fn()}
      />
    );

    expect(screen.getByRole('heading', { name: 'Sala Norte' })).toBeInTheDocument();
    expect(screen.getByText('12 personas maximo')).toBeInTheDocument();
    expect(screen.getByText('Proyector')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Sala Norte' })).toBeInTheDocument();
  });

  it('notifica la sala seleccionada al pulsar los botones de detalle y reserva', async () => {
    const user = userEvent.setup();
    const setSalaSeleccionada = vi.fn();
    const setReservandoSala = vi.fn();

    render(
      <SalaCard
        sala={sala}
        setSalaSeleccionada={setSalaSeleccionada}
        setReservandoSala={setReservandoSala}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Ver detalles' }));
    await user.click(screen.getByRole('button', { name: 'Reservar' }));

    expect(setSalaSeleccionada).toHaveBeenCalledWith(sala);
    expect(setReservandoSala).toHaveBeenCalledWith(sala);
  });
});
