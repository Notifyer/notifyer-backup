const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const connect = async () => {
    return open({
        filename: './src/db/db.db',
        driver: sqlite3.Database
    });
};

const insert = async (values) => {
    const db = await connect();
    try {
        const sql = 'INSERT INTO notifications (title, description, idSession) VALUES (?, ?, ?)';
        await db.run(sql, values);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await db.close();
    }
};

const deleteRow = async (id) => {
    const db = await connect();
    try {
        await db.run("DELETE FROM notifications WHERE id=?", id);
    } catch (err) {
        console.error(err);
    } finally {
        await db.close();
    }
};

const getRows = async (idSession) => {
    const db = await connect();
    try {
        const rows = await db.all("SELECT * FROM notifications WHERE idSession=?", idSession);
        for (let row of rows) {
            await deleteRow(row.id);
        }
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        await db.close();
    }
};

module.exports = { insert, getRows };