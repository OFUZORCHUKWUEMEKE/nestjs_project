import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BaseRepository<T extends Document> {
    constructor(private readonly model: Model<T>) { }

    async create(entity: T): Promise<T> {
        const createdEntity = new this.model(entity);
        return createdEntity.save();
    }

    async findAll(): Promise<T[]> {
        return await this.model.find().exec();
    }

    async findById(id: string): Promise<T> {
        return await this.model.findById(id).exec();
    }

    async update(id: string, entity: Partial<T>): Promise<T> {
        return await this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
    }

    async delete(id: string): Promise<T> {
        return await this.model.findByIdAndRemove(id).exec();
    }

    async findEmail(email: string): Promise<T> {
        return await this.model.findOne({ email })
    }
    async findUsername(username): Promise<T> {
        return await this.model.findOne({ username })
    }

}
