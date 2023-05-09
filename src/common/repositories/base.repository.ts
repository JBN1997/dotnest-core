import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, EntityManager, In, Repository, SelectQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CoreEntity } from '@common/entities/base.entity';

export abstract class BaseRepository<T extends CoreEntity> {
   protected relations: string[] = [];

   constructor(
      protected readonly repository: Repository<T>,
      private readonly manager: EntityManager = repository.manager,
   ) {}

   abstract establishAllRelationships(): BaseRepository<T>;

   establishSomeRelationships(relations: string[]): BaseRepository<T> {
      this.relations = relations;
      return this;
   }

   establishRelationships(
      callback: (repository: BaseRepository<T>, relations: string[]) => void,
   ): BaseRepository<T> {
      callback(this, []);
      return this;
   }

   async countAsync(expression: {} = {}) {
      return await this.repository.countBy(expression);
   }

   async getManyAsync(ids: string[]): Promise<T[]> {
      return await this.repository
         .find({
            where: { id: In(ids) as any },
            relations: this.relations,
         })
         .then((entities) => {
            return Promise.resolve(entities);
         });
   }

   async getAsync(id: string): Promise<T> {
      return await this.repository
         .findOne({
            where: { id: id as any },
            relations: this.relations,
         })
         .then((entity) => {
            if (!entity) {
               return Promise.reject(new NotFoundException('Entity not found.'));
            }

            return Promise.resolve(entity);
         })
         .catch((error) => Promise.reject(error));
   }

   async getByAsync(expression: {}): Promise<T> {
      return await this.repository
         .findOne({
            where: expression,
            relations: this.relations,
         })
         .then((entity) => {
            if (!entity) {
               return Promise.reject(new NotFoundException('Entity not found.'));
            }

            return Promise.resolve(entity);
         })
         .catch((error) => Promise.reject(error));
   }

   async createEntityAsync(inputs: DeepPartial<T>): Promise<T> {
      return await this.repository
         .save(inputs)
         .then(async (entity) => await this.getAsync(entity.id))
         .catch((error) => Promise.reject(error));
   }

   async updateEntityAsync(entity: T, inputs: QueryDeepPartialEntity<T>): Promise<T> {
      return await this.repository
         .update(entity.id, inputs)
         .then(async () => await this.getAsync(entity.id))
         .catch((error) => Promise.reject(error));
   }

   async getAllAsync(): Promise<T[]> {
      return await this.repository.find({
         relations: this.relations,
      });
   }

   async deleteEntityAsync(entity: T): Promise<T> {
      return await this.repository.remove(entity)
      .then(async (result) => Promise.resolve(result))
      .catch((error) => Promise.reject(error));
   }

   async deleteManyAsync(...entities: T[]): Promise<T[]> {
      return await this.repository.remove(entities)
      .then(async (result) => Promise.resolve(result))
      .catch((error) => Promise.reject(error));
   }

   async deleteManyByIdAsync(...ids: string[]): Promise<DeleteResult> {
      return await this.repository.delete({ id: In(ids) as any })
      .then(async (result) => {
         if (!result) {
            return Promise.reject(new BadRequestException('Fail to deleteManyByIdAsync'));
         }

         Promise.resolve(result);
      })
      .catch((error) => Promise.reject(error));
   }

   create(): T {
      return this.repository.create();
   }

   async saveAsync(entity: DeepPartial<T>): Promise<T> {
      return await this.repository
         .save(entity)
         .then(async () => await this.getAsync(entity.id))
         .catch((error) => Promise.reject(error));
   }

   async saveManyAsync(entities: DeepPartial<T>[]): Promise<T[]> {
      return await this.repository
         .save(entities)
         .then(async () => await this.getManyAsync(entities.map((d) => d.id)))
         .catch((error) => Promise.reject(error));
   }

   async transaction(work: () => void): Promise<void> {
      const runner = this.manager.connection.createQueryRunner();
      await runner.startTransaction();

      try {
         await work();
         await runner.commitTransaction();
      } catch (error) {
         await runner.rollbackTransaction();
         throw error;
      } finally {
         await runner.release();
      }
   }

   async createQuery(): Promise<SelectQueryBuilder<T>> {
      return this.repository.createQueryBuilder();
   }
}
