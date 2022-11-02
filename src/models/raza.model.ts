import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Especie} from './especie.model';

@model()
export class Raza extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @belongsTo(() => Especie)
  especieId: string;

  constructor(data?: Partial<Raza>) {
    super(data);
  }
}

export interface RazaRelations {
  // describe navigational properties here
}

export type RazaWithRelations = Raza & RazaRelations;
