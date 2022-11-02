import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Raza, RazaRelations, Mascota, Especie} from '../models';
import {MascotaRepository} from './mascota.repository';
import {EspecieRepository} from './especie.repository';

export class RazaRepository extends DefaultCrudRepository<
  Raza,
  typeof Raza.prototype.id,
  RazaRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Raza.prototype.id>;

  public readonly especie: BelongsToAccessor<Especie, typeof Raza.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('EspecieRepository') protected especieRepositoryGetter: Getter<EspecieRepository>,
  ) {
    super(Raza, dataSource);
    this.especie = this.createBelongsToAccessorFor('especie', especieRepositoryGetter,);
    this.registerInclusionResolver('especie', this.especie.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
