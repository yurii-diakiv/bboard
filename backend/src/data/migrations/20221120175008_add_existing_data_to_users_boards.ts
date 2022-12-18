import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw('INSERT INTO users_boards (user_id, board_id) select user_id, id from boards');
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw('DELETE FROM users_boards');
}

