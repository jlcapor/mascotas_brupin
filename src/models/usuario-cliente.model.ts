import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioCliente extends Entity {
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
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  confirmado?: boolean;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<UsuarioCliente>) {
    super(data);
  }
}

export interface UsuarioClienteRelations {
  // describe navigational properties here
}

export type UsuarioClienteWithRelations = UsuarioCliente & UsuarioClienteRelations;
