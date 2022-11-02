import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Especie} from '../models';
import {EspecieRepository} from '../repositories';

export class EspecieController {
  constructor(
    @repository(EspecieRepository)
    public especieRepository : EspecieRepository,
  ) {}

  @post('/especies')
  @response(200, {
    description: 'Especie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Especie)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especie, {
            title: 'NewEspecie',
            exclude: ['id'],
          }),
        },
      },
    })
    especie: Omit<Especie, 'id'>,
  ): Promise<Especie> {
    return this.especieRepository.create(especie);
  }

  @get('/especies/count')
  @response(200, {
    description: 'Especie model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Especie) where?: Where<Especie>,
  ): Promise<Count> {
    return this.especieRepository.count(where);
  }

  @get('/especies')
  @response(200, {
    description: 'Array of Especie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Especie, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Especie) filter?: Filter<Especie>,
  ): Promise<Especie[]> {
    return this.especieRepository.find(filter);
  }

  @patch('/especies')
  @response(200, {
    description: 'Especie PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especie, {partial: true}),
        },
      },
    })
    especie: Especie,
    @param.where(Especie) where?: Where<Especie>,
  ): Promise<Count> {
    return this.especieRepository.updateAll(especie, where);
  }

  @get('/especies/{id}')
  @response(200, {
    description: 'Especie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Especie, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Especie, {exclude: 'where'}) filter?: FilterExcludingWhere<Especie>
  ): Promise<Especie> {
    return this.especieRepository.findById(id, filter);
  }

  @patch('/especies/{id}')
  @response(204, {
    description: 'Especie PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especie, {partial: true}),
        },
      },
    })
    especie: Especie,
  ): Promise<void> {
    await this.especieRepository.updateById(id, especie);
  }

  @put('/especies/{id}')
  @response(204, {
    description: 'Especie PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() especie: Especie,
  ): Promise<void> {
    await this.especieRepository.replaceById(id, especie);
  }

  @del('/especies/{id}')
  @response(204, {
    description: 'Especie DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.especieRepository.deleteById(id);
  }
}
