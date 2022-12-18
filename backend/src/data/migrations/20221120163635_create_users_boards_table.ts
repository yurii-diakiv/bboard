import { Knex } from 'knex';
import { getFormattedISODate } from '../../helpers/helpers';
import { TableName } from '../../common/enums/enums';

export async function up(knex: Knex): Promise<void> {
    const dateNowISO = getFormattedISODate(new Date());

    return knex.schema.createTable(TableName.USERS_BOARDS, (table) => {
        table
            .uuid('id')
            .unique()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary({ constraintName: 'users_boards_pkey' });
        table
            .uuid('user_id')
            .references('id')
            .inTable(TableName.USERS)
            .notNullable();
        table
            .uuid('board_id')
            .references('id')
            .inTable(TableName.BOARDS)
            .notNullable();
        table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TableName.USERS_BOARDS);
}

