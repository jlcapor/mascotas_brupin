import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Especie, EspecieRelations, Raza} from '../models';
import {RazaRepository} from './raza.repository';

export class EspecieRepository extends DefaultCrudRepository<
  Especie,
  typeof Especie.prototype.id,
  EspecieRelations
> {

  public readonly razas: HasManyRepositoryFactory<Raza, typeof Especie.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RazaRepository') protected razaRepositoryGetter: Getter<RazaRepository>,
  ) {
    super(Especie, dataSource);
    this.razas = this.createHasManyRepositoryFactoryFor('razas', razaRepositoryGetter,);
    this.registerInclusionResolver('razas', this.razas.inclusionResolver);
  }
}
