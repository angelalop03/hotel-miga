import { describe, expect, it } from 'vitest';
import { formatearFechaADate, formatearFechaAYYYYMMDD } from './funcionesAuxiliares';

describe('funcionesAuxiliares', () => {
  it('formatea fechas de DD/MM/YYYY a YYYY-MM-DD rellenando ceros', () => {
    expect(formatearFechaAYYYYMMDD('5/1/2026')).toBe('2026-01-05');
  });

  it('convierte una fecha YYYY-MM-DD en un objeto Date con el mes correcto', () => {
    const fecha = formatearFechaADate('2026-01-05');

    expect(fecha).toEqual(new Date(2026, 0, 5));
  });
});
