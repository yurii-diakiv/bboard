import { Knex } from "knex";
import { getFormattedISODate } from '../../helpers/helpers';

export async function up(knex: Knex): Promise<void> {
    const dateNowISO = getFormattedISODate(new Date());

    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable('users', (table) => {
      table
        .uuid('id')
        .unique()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary({ constraintName: 'users_pkey' });
      table.string('name').notNullable();
      table.string('surname').notNullable();
      table.string('phone').notNullable();
      table.string('email').unique().notNullable();
      table.text('password_hash').notNullable();
      table.text('password_salt').notNullable();
      table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
