import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Especie,
  Raza,
} from '../models';
import {EspecieRepository} from '../repositories';

export class EspecieRazaController {
  constructor(
    @repository(EspecieRepository) protected especieRepository: EspecieRepository,
  ) { }

  @get('/especies/{id}/razas', {
    responses: {
      '200': {
        description: 'Array of Especie has many Raza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Raza)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Raza>,
  ): Promise<Raza[]> {
    return this.especieRepository.razas(id).find(filter);
  }

  @post('/especies/{id}/razas', {
    responses: {
      '200': {
        description: 'Especie model instance',
        content: {'application/json': {schema: getModelSchemaRef(Raza)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Especie.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {
            title: 'NewRazaInEspecie',
            exclude: ['id'],
            optional: ['especieId']
          }),
        },
      },
    }) raza: Omit<Raza, 'id'>,
  ): Promise<Raza> {
    return this.especieRepository.razas(id).create(raza);
  }

  @patch('/especies/{id}/razas', {
    responses: {
      '200': {
        description: 'Especie.Raza PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {partial: true}),
        },
      },
    })
    raza: Partial<Raza>,
    @param.query.object('where', getWhereSchemaFor(Raza)) where?: Where<Raza>,
  ): Promise<Count> {
    return this.especieRepository.razas(id).patch(raza, where);
  }

  @del('/especies/{id}/razas', {
    responses: {
      '200': {
        description: 'Especie.Raza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Raza)) where?: Where<Raza>,
  ): Promise<Count> {
    return this.especieRepository.razas(id).delete(where);
  }
}
