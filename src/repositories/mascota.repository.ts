import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Plan, Raza} from '../models';
import {ClienteRepository} from './cliente.repository';
import {PlanRepository} from './plan.repository';
import {RazaRepository} from './raza.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof Mascota.prototype.id>;

  public readonly raza: BelongsToAccessor<Raza, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('RazaRepository') protected razaRepositoryGetter: Getter<RazaRepository>,
  ) {
    super(Mascota, dataSource);
    this.raza = this.createBelongsToAccessorFor('raza', razaRepositoryGetter,);
    this.registerInclusionResolver('raza', this.raza.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
