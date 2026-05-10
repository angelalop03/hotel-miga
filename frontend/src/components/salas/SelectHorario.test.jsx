import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SelectHorario from './SelectHorario';

describe('SelectHorario', () => {
  it('muestra los horarios disponibles y deshabilita los ocupados', () => {
    const { asFragment } = render(
      <SelectHorario value="" setHorario={vi.fn()} horariosOcupados={['mediodia']} />
    );

    expect(screen.getByRole('option', { name: 'Selecciona un horario disponible' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Ma.ana/ })).toBeEnabled();
    expect(screen.getByRole('option', { name: /Mediod.a/ })).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Noche' })).toBeEnabled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('llama a setHorario cuando el usuario selecciona un horario', async () => {
    const user = userEvent.setup();
    const setHorario = vi.fn();

    render(<SelectHorario value="" setHorario={setHorario} horariosOcupados={[]} />);

    await user.selectOptions(screen.getByRole('combobox'), 'noche');

    expect(setHorario).toHaveBeenCalledWith('noche');
  });
});
