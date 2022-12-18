import { Knex } from "knex";
import { TableName } from '../../common/enums/enums';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName.CARDS, (table) =>
        table
            .uuid('assignee_id')
            .references('id')
            .inTable(TableName.USERS)
    );
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName.CARDS, (table) => table.dropColumn('assignee_id'));
}

