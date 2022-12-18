import { Knex } from "knex";
import { getFormattedISODate } from '../../helpers/helpers';
import { TableName } from '../../common/enums/enums';

export async function up(knex: Knex): Promise<void> {
    const dateNowISO = getFormattedISODate(new Date());

    return knex.schema.createTable(TableName.CARDS, (table) => {
        table
            .uuid('id')
            .unique()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary({ constraintName: 'cards_pkey' });
        table.string('title').notNullable();
        table.string('text').notNullable();
        table
            .uuid('column_id')
            .notNullable()
            .references('id')
            .inTable(TableName.COLUMNS);
        table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TableName.CARDS);
}
