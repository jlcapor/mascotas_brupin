import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Raza,
  Especie,
} from '../models';
import {RazaRepository} from '../repositories';

export class RazaEspecieController {
  constructor(
    @repository(RazaRepository)
    public razaRepository: RazaRepository,
  ) { }

  @get('/razas/{id}/especie', {
    responses: {
      '200': {
        description: 'Especie belonging to Raza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Especie)},
          },
        },
      },
    },
  })
  async getEspecie(
    @param.path.string('id') id: typeof Raza.prototype.id,
  ): Promise<Especie> {
    return this.razaRepository.especie(id);
  }
}
