const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // ou seu banco de dados

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const Show = sequelize.define('Show', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

const Purchase = sequelize.define('Purchase', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Associações
User.hasMany(Purchase);
Show.hasMany(Purchase);
Purchase.belongsTo(User);
Purchase.belongsTo(Show);

// Função para sincronizar o banco de dados
const syncDatabase = async () => {
    await sequelize.sync();

    // Adicionando dados de teste
    await Show.bulkCreate([
        {
            name: 'Tourada',
            venue: 'Life Club',
            date: new Date('2024-10-01'),
            price: 85.0,
        },
        {
            name: 'FFF',
            venue: 'Desgosto',
            date: new Date('2024-10-05'),
            price: 60.0,
        },
        {
            name: 'Baile do Ike',
            venue: 'NoClass',
            date: new Date('2024-10-10'),
            price: 30.0,
        },
    ]);
};

module.exports = { User, Show, Purchase, syncDatabase };
