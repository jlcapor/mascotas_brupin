import {Entity, model, property, hasMany} from '@loopback/repository';
import {Raza} from './raza.model';

@model()
export class Especie extends Entity {
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

  @hasMany(() => Raza)
  razas: Raza[];

  constructor(data?: Partial<Especie>) {
    super(data);
  }
}

export interface EspecieRelations {
  // describe navigational properties here
}

export type EspecieWithRelations = Especie & EspecieRelations;
